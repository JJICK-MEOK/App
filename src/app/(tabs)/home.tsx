import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { colors } from '@/src/constants/colors';
import TopNav from '@/src/components/Nav/TopNav';
import PersonalizeButton from '@/src/components/Button/PersonalizeButton';
import Indicator from '@/src/components/Indicator/Indicator';
import Program from '@/assets/images/Program.svg';
import OneDay from '@/assets/images/OneDay.svg';
import Event from '@/assets/images/Event.svg';
import Club from '@/assets/images/Club.svg';
import ArrowRight from '@/assets/images/ArrowRight.svg';
import RecommendationCard from '@/src/components/Card/RecommendationCard';
import PromotionCard from '@/src/components/Card/PromotionCard';

const ICONS = [
  { Svg: Program, width: 33, height: 33, label: '프로그램' },
  { Svg: OneDay, width: 32, height: 32, label: '원데이' },
  { Svg: Event, width: 32, height: 32, label: '행사강연' },
  { Svg: Club, width: 38, height: 38, label: '동아리' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <ScreenLayout>
      <LinearGradient
        colors={[colors.primary.main, colors.primary.sub, colors.primary.light]}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        >
          <TopNav name="닉네임" />
          <View style={styles.main}>
            <View style={styles.bannerWrapper}>
              <View style={styles.banner}>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / 335);
                    setActiveIndex(index);
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <View key={i} style={styles.bannerContent}>
                      {i === 0 && (
                        <>
                          <View>
                            <Text style={styles.title}>확신이 없어도 괜찮아요</Text>
                            <View style={styles.titleRow}>
                              <Text style={styles.title}>일단 </Text>
                              <View style={styles.chikmeok}>
                                <Text style={styles.title}>찍먹</Text>
                              </View>
                              <Text style={styles.title}> 해보세요!</Text>
                            </View>
                          </View>
                          <Text style={styles.subtitle}>다양한 활동을 부담 없이 탐색해보세요</Text>
                          <PersonalizeButton
                            label="나만의 경험 탐색하기"
                            onPress={() => router.push('/(tabs)/custom')}
                          />
                        </>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
              <Indicator count={3} activeIndex={activeIndex} />
            </View>
            <View style={styles.contentSheet}>
              <View style={styles.iconSection}>
                <View style={styles.iconRow}>
                  {ICONS.map(({ Svg, width, height, label }, i) => (
                    <TouchableOpacity key={i} style={styles.iconItem} activeOpacity={0.7}>
                      <View style={styles.iconContainer}>
                        <Svg width={width} height={height} />
                      </View>
                      <Text style={styles.iconLabel}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.recommendSection}>
                <View style={styles.recommendRow}>
                  <View style={styles.recommendTextRow}>
                    <View style={styles.nameTag}>
                      <Text style={styles.recommendTitle}>닉네임</Text>
                    </View>
                    <Text style={styles.recommendTitle}> 님에게 추천해요!</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push('/(tabs)/custom')}
                    activeOpacity={0.7}
                  >
                    <ArrowRight style={{ marginRight: 21 }} />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardsContainer}
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.7}
                      onPress={() => {
                        // router.push(`/detail/${i}`);
                      }}
                    >
                      <RecommendationCard
                        category="활동카테고리"
                        days={7}
                        title={'후킹용/설명용\n프로그램 관련 멘트'}
                        preferences={['#취향태그', '#취향태그']}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.popularSection}>
                <View style={styles.recommendRow}>
                  <Text style={[styles.recommendTitle, { marginLeft: 20 }]}>인기! 마감 임박</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                    <ArrowRight style={{ marginRight: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.darkCard}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ alignSelf: 'stretch' }}
                    onPress={() => {
                      // router.push('/detail');
                    }}
                  >
                    <PromotionCard
                      days={11}
                      category="활동 카테고리"
                      title={'후킹용/설명용\n프로그램 관련 멘트'}
                      subtitle="주최 기간"
                      showAD={true}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ alignSelf: 'stretch' }}
                    onPress={() => {
                      // router.push('/detail');
                    }}
                  >
                    <PromotionCard
                      days={11}
                      category="활동 카테고리"
                      title={'후킹용/설명용\n프로그램 관련 멘트'}
                      subtitle="주최 기간"
                      showAD={false}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ alignSelf: 'stretch' }}
                    onPress={() => {
                      // router.push('/detail');
                    }}
                  >
                    <PromotionCard
                      days={11}
                      category="활동 카테고리"
                      title={'후킹용/설명용\n프로그램 관련 멘트'}
                      subtitle="주최 기간"
                      showAD={false}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    gap: 18,
    alignItems: 'center',
    paddingBottom: 0,
  },
  main: {
    gap: 17,
    alignSelf: 'stretch',
  },
  bannerWrapper: {
    gap: 10,
    alignItems: 'center',
  },
  banner: {
    width: 335,
    height: 161,
    borderRadius: 15,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bannerContent: {
    width: 335,
    paddingLeft: 18,
    marginTop: 23.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chikmeok: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFE066',
  },
  title: {
    color: '#222',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#666',
    fontFamily: 'Pretendard',
    fontSize: 10,
    fontWeight: '400',
    marginTop: 7,
    marginBottom: 28,
  },
  contentSheet: {
    alignSelf: 'stretch',
    paddingBottom: 76,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 7.1,
    elevation: 4,
  },
  iconSection: {
    height: 117,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    position: 'absolute',
    top: 117,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 33,
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
    alignSelf: 'stretch',
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
  },
  recommendSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
    marginTop: 51,
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
  },
  recommendTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  nameTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary.sub,
  },
  popularSection: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 70,
    gap: 16,
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
    marginBottom: 176,
    borderRadius: 14,
    backgroundColor: '#222',
  },
  recommendTitle: {
    color: '#222',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
  },
});
