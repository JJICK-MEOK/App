import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

export default function OnboardingResult() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>추천 결과</Text>
      </View>

      <View style={styles.cta}>
        <BottomCTA
          label="더 많은 추천 확인하기"
          onPress={() => router.replace('/(tabs)')}
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
    paddingTop: 32,
  },
  title: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  cta: { paddingHorizontal: 20, paddingBottom: 45, paddingTop: 16 },
});
