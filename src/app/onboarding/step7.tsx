import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

export default function OnboardingStep7() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>활동 준비 완료했습니다!</Text>
      </View>

      <View style={styles.cta}>
        <BottomCTA
          label="확인하기"
          onPress={() => router.push('/onboarding/result')}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral.white },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  cta: { paddingHorizontal: 20, paddingBottom: 45, paddingTop: 16 },
});
