import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import TopNav from '@/src/components/Nav/TopNav';
import PersonalizedCTA from '@/src/components/Button/PersonalizedCTA';
import Program from '@/assets/images/Program.svg';
import OneDay from '@/assets/images/OneDay.svg';
import Event from '@/assets/images/Event.svg';
import Club from '@/assets/images/Club.svg';
import RecommendationCard from '@/src/components/Card/RecommendationCard';
import PromotionCard from '@/src/components/Card/PromotionCard';

// TODO: 백엔드 연동 후 실제 유저 이름으로 교체
const USER_NAME = '00';

const ICONS = [
  { Svg: Program, label: '프로그램', route: '/activity-categories/program' },
  { Svg: OneDay, label: '원데이', route: '/activity-categories/oneday' },
  { Svg: Event, label: '행사·강연', route: '/activity-categories/festival' },
  { Svg: Club, label: '동아리', route: '/activity-categories/club' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScreenLayout style={{ backgroundColor: '#FFF' }}>
      <View style={[styles.topNavWrapper, { paddingTop: insets.top }]}>
        <TopNav name={USER_NAME} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.main}>
          <View style={styles.bannerSection}>
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>{'확신이 없어도 괜찮아요\n일단 찍먹 해보세요'}</Text>
              <View style={styles.ctaWrapper}>
                <PersonalizedCTA
                  label="나만의 경험 탐색하기"
                  onPress={() => router.push('/(tabs)/custom')}
                />
              </View>
            </View>
          </View>

          <View style={styles.iconSection}>
            <View style={styles.iconRow}>
              {ICONS.map(({ Svg, label, route }, i) => (
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

          <View style={styles.contentSheet}>
            <View style={styles.recommendSection}>
              <Text style={styles.sectionTitle}>{USER_NAME} 님에게 추천해요!</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    onPress={() => router.push('/detail/123')}
                  >
                    <RecommendationCard
                      category="프로그램"
                      title={'후킹용/설명용\n프로그램 관련 멘트'}
                      preferences={['#취향태그', '#취향태그']}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.popularSection}>
              <View style={styles.popularRow}>
                <Text style={styles.popularTitle}>인기! 마감 임박</Text>
              </View>
              <View style={styles.darkCard}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ alignSelf: 'stretch' }}
                  onPress={() => router.push('/detail/123')}
                >
                  <PromotionCard
                    category="프로그램"
                    title="한국 광고 아카데미 한광아 11기 모집"
                    showAD={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ alignSelf: 'stretch' }}
                  onPress={() => router.push('/detail/123')}
                >
                  <PromotionCard
                    category="프로그램"
                    title="한국 광고 아카데미 한광아 11기 모집"
                    showAD={false}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ alignSelf: 'stretch' }}
                  onPress={() => router.push('/detail/123')}
                >
                  <PromotionCard
                    category="프로그램"
                    title="한국 광고 아카데미 한광아 11기 모집"
                    showAD={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  topNavWrapper: {
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
