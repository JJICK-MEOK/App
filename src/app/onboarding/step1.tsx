import { StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import CarouselAuto from '@/src/components/Carousel/CarouselAuto';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import Ellipse37 from '@/assets/images/Ellipse 37.svg';
import Ellipse38 from '@/assets/images/Ellipse 38.svg';
import Ellipse39 from '@/assets/images/Ellipse 39.svg';
import Ellipse40 from '@/assets/images/Ellipse 40.svg';

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <Stack.Screen options={{ gestureEnabled: false }} />

      <Typography size="xxxl" weight="semiBold" style={styles.title}>
        {'내가 뭘 좋아하는지\n아직 잘 모르겠다면?'}
      </Typography>

      <View style={styles.carouselWrapper}>
        <CarouselAuto images={[Ellipse37, Ellipse38, Ellipse39, Ellipse40]} />
      </View>

      <View style={styles.spacer} />

      <CTAContainer style={styles.cta}>
        <Text style={styles.ctaSubText}>
          <Text style={styles.ctaBold}>1분만에</Text>
          <Text style={styles.ctaRegular}> 나에게 맞는 활동 찾기</Text>
        </Text>
        <BottomCTA label="다음" onPress={() => router.push('/onboarding/step2')} variant="dark" />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
  },
  title: {
    marginTop: 185,
    textAlign: 'center',
    lineHeight: 32,
    color: colors.text.primary,
  },
  carouselWrapper: {
    marginTop: 213,
  },
  spacer: {
    flex: 1,
  },
  cta: {
    paddingTop: 16,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: 16,
  },
  ctaSubText: {
    textAlign: 'center',
  },
  ctaBold: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    color: colors.text.primary,
  },
  ctaRegular: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: colors.text.primary,
  },
});
