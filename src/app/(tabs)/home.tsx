import { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { Loading } from '@/src/components/Loading/Loading';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import TopNav from '@/src/components/Nav/TopNav';
import PersonalizedCTA from '@/src/components/Button/PersonalizedCTA';
import Program from '@/assets/images/Program.svg';
import OneDay from '@/assets/images/OneDay.svg';
import Event from '@/assets/images/Event.svg';
import Club from '@/assets/images/Club.svg';
import RecommendationCard from '@/src/components/Card/RecommendationCard';
import PromotionCard from '@/src/components/Card/PromotionCard';
import { getTags } from '@/src/api/tags';
import { getHomeData } from '@/src/api/pages';

type IconConfig = {
  Svg: React.ComponentType<{ width?: number; height?: number; style?: object }>;
  label: string;
  route: string;
};

const ICON_ORDER = ['프로그램', '원데이', '행사·강연', '동아리'];

const ICON_CONFIG: Record<string, Omit<IconConfig, 'label'>> = {
  프로그램: { Svg: Program, route: '/activity-categories/program' },
  원데이: { Svg: OneDay, route: '/activity-categories/oneday' },
  '행사·강연': { Svg: Event, route: '/activity-categories/festival' },
  동아리: { Svg: Club, route: '/activity-categories/club' },
};

const DEFAULT_ICONS: IconConfig[] = [
  { Svg: Program, label: '프로그램', route: '/activity-categories/program' },
  { Svg: OneDay, label: '원데이', route: '/activity-categories/oneday' },
  { Svg: Event, label: '행사·강연', route: '/activity-categories/festival' },
  { Svg: Club, label: '동아리', route: '/activity-categories/club' },
];

const ACTIVITY_TYPE_LABEL: Record<string, string> = {
  PROGRAM: '프로그램',
  ONEDAY: '원데이',
  ONE_DAY: '원데이',
  EVENT: '행사·강연',
  CLUB: '동아리',
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [icons, setIcons] = useState<IconConfig[]>(DEFAULT_ICONS);
  const [isPulling, setIsPulling] = useState(false);
  const scrollYRef = useRef(0);
  const isPullingRef = useRef(false);
  const pullAnim = useRef(new Animated.Value(0)).current;

  const PULL_THRESHOLD = 60;
  const PULL_MAX = 80;

  const { data: homeData, refetch, isError, error } = useQuery({
    queryKey: ['home'],
    queryFn: getHomeData,
  });

  const nickname = homeData?.user.nickname ?? '';

  const closingSoon = homeData?.closingSoonActivities ?? [];
  const adCard = closingSoon.find((a) => a.isAd);
  const nonAdCards = closingSoon.filter((a) => !a.isAd);
  const displayCards = adCard ? [adCard, ...nonAdCards] : nonAdCards;

  const isNetworkError = !!(error as any)?.message?.includes('Network Error');

  const recommendErrorMessage = isNetworkError
    ? '네트워크 연결을 확인해주세요'
    : '추천 활동을 불러오지 못했어요. 다시 시도해주세요.';

  const closingSoonErrorMessage = isNetworkError
    ? '네트워크 연결을 확인해주세요'
    : '인기활동을 불러오지 못했어요. 다시 시도해주세요';

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dy, dx }) =>
        scrollYRef.current <= 0 && dy > 8 && dy > Math.abs(dx) * 2,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) {
          const pull = Math.min(dy * 0.4, PULL_MAX);
          pullAnim.setValue(pull);
          if (pull >= PULL_THRESHOLD && !isPullingRef.current) {
            isPullingRef.current = true;
            setIsPulling(true);
          }
        }
      },
      onPanResponderRelease: (_, { dy }) => {
        const pull = Math.min(dy * 0.4, PULL_MAX);
        if (pull >= PULL_THRESHOLD) {
          Animated.spring(pullAnim, { toValue: PULL_MAX, useNativeDriver: false }).start();
          refetch().finally(() => {
            isPullingRef.current = false;
            setIsPulling(false);
            Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
          });
        } else {
          isPullingRef.current = false;
          setIsPulling(false);
          Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
        }
      },
      onPanResponderTerminate: () => {
        isPullingRef.current = false;
        setIsPulling(false);
        Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
      },
    }),
  ).current;

  useEffect(() => {
    getTags('ACTIVITY_CATEGORY')
      .then((tags) => {
        const mapped = tags
          .map((tag) => {
            const config = ICON_CONFIG[tag.name];
            return config ? { ...config, label: tag.name } : null;
          })
          .filter((item): item is IconConfig => item !== null)
          .sort((a, b) => ICON_ORDER.indexOf(a.label) - ICON_ORDER.indexOf(b.label));
        if (mapped.length > 0) setIcons(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <ScreenLayout style={{ backgroundColor: '#FFF' }}>
      <View style={[styles.topNavWrapper, { paddingTop: insets.top }]}>
        <TopNav name={nickname} onSearchPress={() => router.push('/search')} />
      </View>
      <View {...panResponder.panHandlers} style={{ flex: 1 }}>
        <Animated.View style={[styles.pullArea, { height: pullAnim }]}>
          {isPulling && <Loading />}
        </Animated.View>
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
                {icons.map(({ Svg, label, route }, i) => (
                  <TouchableOpacity
                    key={i}
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
                <Text style={styles.sectionTitle}>{nickname} 님에게 추천해요!</Text>
                {isError ? (
                  <View style={styles.recommendErrorBox}>
                    <Text style={styles.errorText}>{recommendErrorMessage}</Text>
                    <TouchableOpacity
                      style={styles.retryButton}
                      onPress={() => refetch()}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.retryText}>다시 시도</Text>
                    </TouchableOpacity>
                  </View>
                ) : (homeData?.recommendedActivities ?? []).length === 0 ? (
                  <View style={styles.recommendErrorBox}>
                    <Text style={styles.errorText}>아직 추천할 활동이 부족해요.</Text>
                  </View>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsContainer}
                  >
                    {(homeData?.recommendedActivities ?? []).map((activity) => (
                      <TouchableOpacity
                        key={activity.id}
                        activeOpacity={0.7}
                        onPress={() => router.push(`/detail/${activity.id}`)}
                      >
                        <RecommendationCard
                          category={ACTIVITY_TYPE_LABEL[activity.activityType] ?? activity.activityType}
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
                      <Text style={styles.errorText}>{closingSoonErrorMessage}</Text>
                      <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => refetch()}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.retryText}>다시 시도</Text>
                      </TouchableOpacity>
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
                            category={ACTIVITY_TYPE_LABEL[activity.activityType] ?? activity.activityType}
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
  pullArea: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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
