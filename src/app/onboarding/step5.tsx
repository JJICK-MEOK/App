import { StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import IconSuccess from '@/src/components/Icon/IconSuccess';
import { postOnboarding } from '@/src/api/user';
import { useOnboardingStore } from '@/src/store/onboardingStore';

export default function OnboardingStep5() {
  const router = useRouter();
  const { nickname, topicTagIds, regionIds, preferenceTagIds } = useOnboardingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: postOnboarding,
    onSuccess: () => router.replace('/onboarding/result'),
  });

  const completeOnboarding = () => mutate({ topicTagIds, regionIds, preferenceTagIds });

  return (
    <ScreenLayout style={styles.container}>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View style={styles.progressContainer}>
        <ProgressBar step={4} />
      </View>
      <View style={styles.checkContainer}>
        <IconSuccess />
        <Typography size="xxxl" weight="semiBold" style={styles.title}>
          {`${nickname} 님을 위한\n활동들이 준비됐어요`}
        </Typography>
      </View>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="확인하기"
          onPress={() => completeOnboarding()}
          variant="dark"
          disabled={isPending}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  checkContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: { textAlign: 'center' },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, paddingTop: 9, paddingBottom: 7 },
});
