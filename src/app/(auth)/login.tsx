import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import SocialLoginButton from '@/src/components/Button/SocialLoginButton';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.primary.main, colors.primary.sub, colors.primary.light]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <Text style={styles.title}>{'나에게 맞는\n새로운 경험의 시작'}</Text>

      <View style={styles.socialButtons}>
        <SocialLoginButton provider="naver" onPress={() => {}} />
        <SocialLoginButton provider="google" onPress={() => {}} />
        <SocialLoginButton provider="kakao" onPress={() => {}} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>또는</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.cta}>
        <BottomCTA
          label="이메일로 시작하기"
          onPress={() => router.push('/(auth)/email-login')}
          variant="white"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xxxl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    lineHeight: 32,
    marginTop: 121,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 31,
    marginTop: 'auto',
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 23,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.default,
  },
  dividerText: {
    fontFamily: typography.family.base,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
  },
  cta: {
    paddingBottom: 45,
  },
});
