import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import Icon from '@/src/components/Icon/Icon';

export default function OnboardingStep7() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack} />
      </View>
      <View style={styles.checkContainer}>
        <Icon name="check" size={90} />
        <Typography size="xxxl" weight="bold" style={styles.title}>
          {'00님을 위한\n활동들이 준비됐어요!'}
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
  checkContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 13,
  },

  title: { textAlign: 'center' },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, marginBottom: 9, marginTop: 53 },
  progressTrack: { height: 2, backgroundColor: '#FFE066' },
});
