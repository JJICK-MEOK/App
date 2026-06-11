import { StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import CarouselAuto from '@/src/components/Carousel/CarouselAuto';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <Stack.Screen options={{ gestureEnabled: false }} />

      <View style={styles.content}>
        <Typography size="xxxl" weight="semiBold" style={styles.title}>
          {'내가 뭘 좋아하는지\n아직 잘 모르겠다면?'}
        </Typography>
      </View>

      <View style={styles.carouselWrapper}>
        <CarouselAuto images={[]} />
      </View>

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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  title: {
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 32,
  },
  carouselWrapper: {
    marginBottom: 59,
  },
  cta: {
    paddingTop: 16,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: 10,
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
