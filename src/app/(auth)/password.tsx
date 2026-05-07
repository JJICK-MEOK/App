import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

export default function PasswordScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="비밀번호 만들기" />

      <View style={styles.content}>
        <Text style={styles.title}>비밀번호 만들기</Text>
      </View>

      <View style={styles.cta}>
        <BottomCTA
          label="회원가입 완료"
          onPress={() => router.push('/onboarding/step1')}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
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
  cta: {
    paddingHorizontal: 20,
    paddingBottom: 45,
    paddingTop: 16,
  },
});
