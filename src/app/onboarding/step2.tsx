import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import Icon from '@/src/components/Icon/Icon';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export default function OnboardingStep2() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkContainer}>
          <Icon name="check" size={90} />
          <Typography size="xxxl" weight="bold">
            프로필 설정 완료
          </Typography>
        </View>
      </View>
      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => router.push('/onboarding/step3')}
          variant="primary"
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 13,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
});
