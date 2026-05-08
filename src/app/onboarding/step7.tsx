import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export default function OnboardingStep7() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.content}>
        <Typography size="xxxl" weight="bold" style={styles.title}>
          활동 준비 완료했습니다!
        </Typography>
      </View>
      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="확인하기"
          onPress={() => router.push('/onboarding/result')}
          variant="primary"
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  content: { flex: 1, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center' },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
});
