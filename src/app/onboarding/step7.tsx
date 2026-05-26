import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import Icon from '@/src/components/Icon/Icon';
import { postOnboarding } from '@/src/api/user';
import { useOnboardingStore } from '@/src/store/onboardingStore';

export default function OnboardingStep7() {
  const router = useRouter();
  const { topicTagIds, regionIds, preferenceTagIds } = useOnboardingStore();

  const { mutate: completeOnboarding, isPending } = useMutation({
    mutationFn: () => postOnboarding({ topicTagIds, regionIds, preferenceTagIds }),
    onSuccess: () => {
      router.push('/onboarding/result');
    },
    onError: (error: any) => {
      console.error('온보딩 완료 실패', error);
    },
  });

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar step={4} />
      </View>
      <View style={styles.checkContainer}>
        <Icon name="check" size={90} />
        <Typography size="xxxl" weight="bold" style={styles.title}>
          {'준비가 다 됐어요!\n활동을 확인해볼까요?'}
        </Typography>
      </View>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="확인하기"
          onPress={() => completeOnboarding()}
          variant="primary"
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
    gap: 13,
  },
  title: { textAlign: 'center' },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, marginBottom: 9 },
});
