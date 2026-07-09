import { useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Typography } from '@/src/components/Typography/Typography';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Loading } from '@/src/components/Loading/Loading';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import CurationDetailCard from '@/src/components/Card/CurationDetailCard';
import BottomNavigation from '@/src/components/Nav/BottomNavigation';
import type { TabKey } from '@/src/components/Nav/BottomNav';
import { colors } from '@/src/constants/colors';
import { useNavigateOnce } from '@/src/hooks/useNavigateOnce';
import { getBestType, getPersonalizationActivities } from '@/src/api/activities';
import { getDetailData } from '@/src/api/pages';
import { assignUniqueVariants } from '@/src/utils/tagVariant';

const TAB_TO_ROUTE: Record<TabKey, string> = {
  home: '/home',
  category: '/category',
  personalize: '/custom',
  heart: '/wishlist',
  my: '/mypage',
};

const CURATION_SUBTITLE = '취향에 딱 맞는 활동을 모았어요';
const CURATION_CARD_COUNT = 4;

const ACTIVITY_TYPE_LABEL: Record<string, string> = {
  PROGRAM: '프로그램',
  ONE_DAY: '원데이',
  EVENT: '행사·강연',
  CLUB: '동아리',
};

type CurationDetailActivity = {
  id: number;
  category: string;
  dday: string;
  title: string;
  thumbnailUrl?: string;
  initialSaved: boolean;
};

async function fetchCurationDetailActivities(): Promise<CurationDetailActivity[]> {
  const items = (await getPersonalizationActivities()).slice(0, CURATION_CARD_COUNT);
  const details = await Promise.all(items.map((item) => getDetailData(item.id)));
  return items.map((item, i) => {
    const detail = details[i];
    return {
      id: item.id,
      category: ACTIVITY_TYPE_LABEL[detail.activityType] ?? detail.activityType,
      dday: detail.deadline <= 0 ? 'D-day' : `D-${detail.deadline}`,
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
      initialSaved: item.activityFavoriteId != null,
    };
  });
}

export default function CurationDetailScreen() {
  const router = useRouter();
  const navigateOnce = useNavigateOnce();
  const insets = useSafeAreaInsets();

  const {
    data: bestType,
    isError: isBestTypeError,
    error: bestTypeError,
    refetch: refetchBestType,
  } = useQuery({
    queryKey: ['personalization', 'best-type'],
    queryFn: getBestType,
  });

  const {
    data: activities,
    isLoading,
    isError: isActivitiesError,
    error: activitiesError,
    refetch: refetchActivities,
  } = useQuery({
    queryKey: ['personalization', 'curation-detail-activities'],
    queryFn: fetchCurationDetailActivities,
  });

  useFocusEffect(
    useCallback(() => {
      refetchActivities();
    }, [refetchActivities]),
  );

  const isError = isBestTypeError || isActivitiesError;
  const error = bestTypeError ?? activitiesError;

  const errorMessage = (() => {
    if (!isError) return null;
    const err = error as AxiosError;
    if (err.response?.status === 401) return '로그인 시간이 만료되었어요. 다시 로그인해주세요.';
    if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK')
      return '네트워크 연결을 확인해주세요.';
    return '큐레이션 정보를 불러오지 못했어요. 다시 시도해주세요.';
  })();

  const isRetriable = isError && (error as AxiosError)?.response?.status !== 401;

  const retry = () => {
    refetchBestType();
    refetchActivities();
  };

  const tags = assignUniqueVariants((bestType?.userTags ?? []).slice(0, 2));
  const curationActivities = activities ?? [];

  return (
    <ScreenLayout style={{ backgroundColor: colors.neutral.white, paddingTop: insets.top }}>
      <ArrowLeftBar onPress={() => router.back()} />
      {isError ? (
        <View style={styles.errorBox}>
          <Typography size="sm" weight="medium" color="secondary" style={styles.errorText}>
            {errorMessage}
          </Typography>
          {isRetriable && (
            <TouchableOpacity style={styles.retryButton} onPress={retry} activeOpacity={0.7}>
              <Typography size="sm" weight="medium" color="secondary">
                다시 시도
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{bestType?.bestType ?? ''}</Text>
            <Text style={styles.subtitle}>{CURATION_SUBTITLE}</Text>
          </View>
          <View style={styles.tagsRow}>
            {tags.map((tag) => (
              <ChipBadge key={tag.label} label={tag.label} variant={tag.variant} />
            ))}
          </View>
          <View style={styles.listContent}>
            {isLoading ? (
              <View style={styles.loadingBox}>
                <Loading />
              </View>
            ) : (
              <View style={styles.grid}>
                {Array.from(
                  { length: Math.ceil(curationActivities.length / 2) },
                  (_, rowIndex) => {
                    const rowItems = curationActivities.slice(rowIndex * 2, rowIndex * 2 + 2);
                    const isLastRow = rowIndex === Math.ceil(curationActivities.length / 2) - 1;
                    const isOddTotal = curationActivities.length % 2 !== 0;
                    return (
                      <View key={rowItems[0]?.id ?? rowIndex} style={styles.row}>
                        {rowItems.map((activity) => (
                          <TouchableOpacity
                            key={activity.id}
                            style={styles.gridItem}
                            activeOpacity={0.9}
                            onPress={() => navigateOnce(`/detail/${activity.id}`)}
                          >
                            <CurationDetailCard
                              activityId={activity.id}
                              category={activity.category}
                              dday={activity.dday}
                              title={activity.title}
                              thumbnailUrl={activity.thumbnailUrl}
                              initialSaved={activity.initialSaved}
                            />
                          </TouchableOpacity>
                        ))}
                        {isLastRow && isOddTotal && <View style={styles.gridItem} />}
                      </View>
                    );
                  },
                )}
              </View>
            )}
          </View>
        </>
      )}
      <View style={styles.navWrapper}>
        <BottomNavigation
          activeTab="home"
          onTabChange={(tab: TabKey) => router.push(TAB_TO_ROUTE[tab])}
        />
        <View style={styles.navBottomFiller} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    gap: 7,
    paddingHorizontal: 20,
    marginTop: 17,
  },
  title: {
    color: '#222',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    letterSpacing: -0.48,
  },
  subtitle: {
    color: '#666',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    letterSpacing: -0.28,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 14,
  },
  listContent: {
    paddingBottom: 140,
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  errorBox: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 16,
  },
  errorText: {
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  grid: {
    gap: 22,
    paddingTop: 27,
    paddingHorizontal: 26,
  },
  row: {
    flexDirection: 'row',
    gap: 19,
  },
  gridItem: {
    flex: 1,
  },
  navWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  navBottomFiller: {
    height: 25,
    backgroundColor: '#FFF',
  },
});
