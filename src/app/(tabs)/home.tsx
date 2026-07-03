import { useState, useMemo, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, PanResponder } from 'react-native';
import { Loading } from '@/src/components/Loading/Loading';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import TopNav from '@/src/components/Nav/TopNav';
import PersonalizedCTA from '@/src/components/Button/PersonalizedCTA';
import Program from '@/assets/images/Program.svg';
import OneDay from '@/assets/images/OneDay.svg';
import Event from '@/assets/images/Event.svg';
import Club from '@/assets/images/Club.svg';
import RecommendationCard from '@/src/components/Card/RecommendationCard';
import PromotionCard from '@/src/components/Card/PromotionCard';
import { getTags } from '@/src/api/user';
import { getHomeData, getCategoryPageData } from '@/src/api/pages';

type IconConfig = {
  Svg: React.ComponentType<{ width?: number; height?: number; style?: object }>;
  label: string;
  route: string;
};

const ICON_CONFIG: Record<string, IconConfig> = {
  프로그램: { Svg: Program, label: '프로그램', route: '/activity-categories/program' },
  원데이: { Svg: OneDay, label: '원데이', route: '/activity-categories/oneday' },
  '행사·강연': { Svg: Event, label: '행사·강연', route: '/activity-categories/festival' },
  동아리: { Svg: Club, label: '동아리', route: '/activity-categories/club' },
};

const DEFAULT_ICONS: IconConfig[] = [
  { Svg: Program, label: '프로그램', route: '/activity-categories/program' },
  { Svg: OneDay, label: '원데이', route: '/activity-categories/oneday' },
  { Svg: Event, label: '행사·강연', route: '/activity-categories/festival' },
  { Svg: Club, label: '동아리', route: '/activity-categories/club' },
];

const ACTIVITY_TYPE_LABEL: Record<string, string> = {
  PROGRAM: '프로그램',
  ONE_DAY: '원데이',
  EVENT: '행사·강연',
  CLUB: '동아리',
};

const PULL_THRESHOLD = 60;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollYRef = useRef(0);
  const isRefreshingRef = useRef(false);
  const refetchRef = useRef<() => Promise<any>>(() => Promise.resolve());

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dy, dx }) =>
        scrollYRef.current <= 0 && dy > 8 && dy > Math.abs(dx) * 2,
      onPanResponderRelease: (_, { dy }) => {
        if (dy * 0.4 >= PULL_THRESHOLD && !isRefreshingRef.current) {
          isRefreshingRef.current = true;
          setIsRefreshing(true);
          refetchRef.current().finally(() => {
            isRefreshingRef.current = false;
            setIsRefreshing(false);
          });
        }
      },
      onPanResponderTerminate: () => {},
    }),
  ).current;

  const {
    data: homeData,
    refetch,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['home'],
    queryFn: () => getHomeData(6),
  });

  const { data: tagsData } = useQuery({
    queryKey: ['tags', 'ACTIVITY_CATEGORY'],
    queryFn: () => getTags('ACTIVITY_CATEGORY'),
  });

  const icons = useMemo(() => {
    if (!tagsData || tagsData.length === 0) return DEFAULT_ICONS;
    const availableNames = new Set(tagsData.map((tag) => tag.name));
    const mapped = Object.keys(ICON_CONFIG)
      .filter((name) => availableNames.has(name))
      .map((name) => ICON_CONFIG[name]);
    return mapped.length > 0 ? mapped : DEFAULT_ICONS;
  }, [tagsData]);

  const nickname = homeData?.user.nickname ?? '';

  const recommendedRaw = (homeData?.recommendedActivities ?? []).filter((a) => a.deadline >= 0);
  const closingSoonRaw = (homeData?.closingSoonActivities ?? []).filter((a) => a.deadline >= 0);
  const needsRecommendedFill = recommendedRaw.length < 6;
  const needsClosingSoonFill = closingSoonRaw.length < 3;

  const shouldLoadGeneralActivities =
    !isLoading && !isError && (needsRecommendedFill || needsClosingSoonFill);
  const {
    data: generalCategoryData,
    isLoading: isGeneralLoading,
    isError: isGeneralError,
    error: generalError,
    refetch: refetchGeneral,
  } = useQuery({
    queryKey: ['category', '', '', ''],
    queryFn: () => getCategoryPageData({}),
    enabled: shouldLoadGeneralActivities,
  });

  const usedIds = new Set([...recommendedRaw, ...closingSoonRaw].map((a) => a.id));
  const fillerPool = (generalCategoryData?.activities ?? []).filter(
    (a) => a.deadline >= 0 && !usedIds.has(a.id),
  );
  const recommendedFill = fillerPool.slice(0, Math.max(0, 6 - recommendedRaw.length));
  const recommended = [...recommendedRaw, ...recommendedFill];
  const closingSoonFill = fillerPool
    .slice(recommendedFill.length)
    .slice(0, Math.max(0, 3 - closingSoonRaw.length));
  const closingSoon = [...closingSoonRaw, ...closingSoonFill];

  refetchRef.current = shouldLoadGeneralActivities
    ? () => Promise.all([refetch(), refetchGeneral()])
    : refetch;

  const adCard = closingSoon.find((a) => a.isAd);
  const nonAdCards = closingSoon.filter((a) => !a.isAd);
  const displayCards = (adCard ? [adCard, ...nonAdCards] : nonAdCards).slice(0, 3);

  const isNetworkError = axios.isAxiosError(error) && !error.response;
  const isSessionExpired = axios.isAxiosError(error) && error.response?.status === 401;

  const homeErrorMessage = isSessionExpired
    ? '로그인 시간이 만료되었어요. 다시 로그인해주세요.'
    : isNetworkError
      ? '네트워크 연결을 확인해주세요.'
      : '홈 화면을 불러오지 못했어요. 다시 시도해주세요.';

  const isGeneralNetworkError = axios.isAxiosError(generalError) && !generalError.response;
  const isGeneralSessionExpired =
    axios.isAxiosError(generalError) && generalError.response?.status === 401;

  const generalErrorMessage = isGeneralSessionExpired
    ? '로그인 시간이 만료되었어요. 다시 로그인해주세요.'
    : isGeneralNetworkError
      ? '네트워크 연결을 확인해주세요.'
      : '활동 목록을 불러오지 못했어요. 다시 시도해주세요.';

  return (
    <ScreenLayout style={{ backgroundColor: '#FFF' }}>
      <View style={[styles.topNavWrapper, { paddingTop: insets.top }]}>
        <TopNav
          name={nickname}
          profileImageUrl={homeData?.user.profileImageUrl}
          onSearchPress={() => router.push('/search')}
        />
      </View>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {isRefreshing && (
          <View style={styles.loadingArea}>
            <Loading />
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={(e) => {
            scrollYRef.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
        >
          <View style={styles.main}>
            <View style={styles.bannerSection}>
              <View style={styles.banner}>
                <Text style={styles.bannerTitle}>
                  {'확신이 없어도 괜찮아요\n일단 찍먹 해보세요'}
                </Text>
                <View style={styles.ctaWrapper}>
                  <PersonalizedCTA
                    label="나만의 경험 탐색하기"
                    onPress={() => router.push('/(tabs)/custom')}
                  />
                </View>
              </View>
            </View>

            <View style={styles.divider} />
            <View style={styles.iconSection}>
              <View style={styles.iconRow}>
                {icons.map(({ Svg, label, route }) => (
                  <TouchableOpacity
                    key={label}
                    style={styles.iconItem}
                    activeOpacity={0.7}
                    onPress={() => router.push(route)}
                  >
                    <View style={styles.iconContainer}>
                      <Svg width={44} height={45} style={{ flexShrink: 0 }} />
                    </View>
                    <Text style={styles.iconLabel}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.divider} />

            <View style={styles.contentSheet}>
              <View style={styles.recommendSection}>
                <Text style={styles.sectionTitle}>{`${nickname} 님에게 추천해요!`}</Text>
                {isError ? (
                  <View style={styles.recommendErrorBox}>
                    <Text style={styles.errorText}>{homeErrorMessage}</Text>
                    {!isSessionExpired && (
                      <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => refetch()}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.retryText}>다시 시도</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : isLoading && !isRefreshing ? (
                  <View style={styles.recommendErrorBox}>
                    <Loading />
                  </View>
                ) : recommended.length === 0 && needsRecommendedFill && isGeneralLoading ? (
                  <View style={styles.recommendErrorBox}>
                    <Loading />
                  </View>
                ) : recommended.length === 0 && needsRecommendedFill && isGeneralError ? (
                  <View style={styles.recommendErrorBox}>
                    <Text style={styles.errorText}>{generalErrorMessage}</Text>
                    {!isGeneralSessionExpired && (
                      <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => refetchGeneral()}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.retryText}>다시 시도</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : recommended.length === 0 ? (
                  <View style={styles.recommendErrorBox}>
                    <Text style={styles.errorText}>아직 추천할 활동이 부족해요.</Text>
                  </View>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsContainer}
                  >
                    {recommended.map((activity) => (
                      <TouchableOpacity
                        key={activity.id}
                        activeOpacity={0.7}
                        onPress={() => router.push(`/detail/${activity.id}`)}
                      >
                        <RecommendationCard
                          category={
                            ACTIVITY_TYPE_LABEL[activity.activityType] ?? activity.activityType
                          }
                          title={activity.title}
                          hashtags={activity.hashtags}
                          deadline={activity.deadline}
                          thumbnailUrl={activity.thumbnailUrl}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {(isError || displayCards.length > 0) && (
                <View style={styles.popularSection}>
                  <View style={styles.popularRow}>
                    <Text style={styles.popularTitle}>인기! 마감 임박</Text>
                  </View>
                  {isError ? (
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>{homeErrorMessage}</Text>
                      {!isSessionExpired && (
                        <TouchableOpacity
                          style={styles.retryButton}
                          onPress={() => refetch()}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.retryText}>다시 시도</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <View style={styles.darkCard}>
                      {displayCards.map((activity) => (
                        <TouchableOpacity
                          key={activity.id}
                          activeOpacity={0.7}
                          style={{ alignSelf: 'stretch' }}
                          onPress={() => router.push(`/detail/${activity.id}`)}
                        >
                          <PromotionCard
                            category={
                              ACTIVITY_TYPE_LABEL[activity.activityType] ?? activity.activityType
                            }
                            title={activity.title}
                            showAD={activity.isAd}
                            deadline={activity.deadline}
                            thumbnailUrl={activity.thumbnailUrl}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  topNavWrapper: {
    backgroundColor: '#FFF',
  },
  loadingArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  main: {
    gap: 5,
    alignSelf: 'stretch',
  },
  bannerSection: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  banner: {
    alignSelf: 'stretch',
    height: 161,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  bannerTitle: {
    position: 'absolute',
    top: 27,
    left: 21,
    color: '#222',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    letterSpacing: 0.6,
  },
  ctaWrapper: {
    position: 'absolute',
    top: 107,
    left: 21,
  },
  divider: {
    height: 5,
    backgroundColor: '#F5F5F5',
    alignSelf: 'stretch',
  },
  iconSection: {
    backgroundColor: '#FFF',
    height: 107,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 38,
  },
  iconItem: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    backgroundColor: '#F5F5F5',
  },
  iconLabel: {
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  contentSheet: {
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  recommendSection: {
    gap: 17,
    paddingTop: 27,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    color: '#222',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    paddingLeft: 20,
  },
  cardsContainer: {
    gap: 12,
    paddingHorizontal: 20,
  },
  popularSection: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 70,
    gap: 16,
  },
  popularRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  popularTitle: {
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginLeft: 20,
  },
  recommendErrorBox: {
    marginHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#222',
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 16,
  },
  errorBox: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 14,
    backgroundColor: '#222',
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: '#FFF',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  retryText: {
    color: '#FFF',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  darkCard: {
    paddingTop: 28,
    paddingRight: 29,
    paddingBottom: 28,
    paddingLeft: 28,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 31,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 14,
    backgroundColor: '#222',
  },
});
