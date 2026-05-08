import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="프로필 설정" />
      <View style={styles.content}>
        <Typography size="xxxl" weight="bold">
          프로필 설정
        </Typography>
      </View>
      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => router.push('/onboarding/step2')}
          variant="primary"
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 32 },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
});
