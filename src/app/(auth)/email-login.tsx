import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';

const isValidEmail = (value: string): boolean => {
  if (/[ㄱ-ㆎ가-힣]/.test(value)) return false;
  if (/\s/.test(value)) return false;
  const atIndex = value.indexOf('@');
  if (atIndex <= 0) return false;
  const domain = value.slice(atIndex + 1);
  if (!domain) return false;
  const dotIndex = domain.indexOf('.');
  if (dotIndex <= 0) return false;
  return domain.slice(dotIndex + 1).length > 0;
};

export default function EmailLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid = isValidEmail(email);
  const isFormValid = emailValid && password.length > 0;

  const emailError = emailTouched
    ? email.length === 0
      ? '이메일을 입력해주세요.'
      : !emailValid
        ? '올바른 이메일 형식으로 입력해주세요.'
        : undefined
    : undefined;

  const passwordError =
    passwordTouched && password.length === 0 ? '비밀번호를 입력해주세요.' : undefined;

  return (
    <ScreenLayout withKeyboard style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="이메일로 로그인" />

      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Typography size="lg" style={styles.label}>
              이메일
            </Typography>
            <TextField
              placeholder="이메일을 입력해주세요."
              value={email}
              onChangeText={setEmail}
              onBlur={() => setEmailTouched(true)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={emailError}
            />
          </View>
          <View style={styles.fieldGroup}>
            <Typography size="lg" style={styles.label}>
              비밀번호
            </Typography>
            <TextField
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              onBlur={() => setPasswordTouched(true)}
              secureText
              errorMessage={passwordError}
            />
          </View>
        </View>

        <CTAContainer style={styles.ctaArea}>
          <BottomCTA
            label="로그인"
            onPress={() => router.replace('/(tabs)')}
            variant="dark"
            disabled={!isFormValid}
          />
          <View style={styles.signupSection}>
            <Typography size="sm" color="secondary">
              아직 계정이 없나요?
            </Typography>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/signup')}
              activeOpacity={0.7}
              style={styles.signupButton}
            >
              <Typography style={styles.signupButtonText}>이메일로 회원가입</Typography>
            </TouchableOpacity>
          </View>
        </CTAContainer>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 63,
  },
  form: {
    gap: 32,
  },
  fieldGroup: {
    gap: 9,
  },
  label: {
    lineHeight: 24,
  },
  ctaArea: {
    paddingTop: 79,
    gap: spacing.md,
  },
  signupSection: {
    alignItems: 'center',
    gap: 14,
    paddingTop: spacing.sm,
  },
  signupButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: '#222',
  },
  signupButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '700',
    color: colors.neutral.white,
  },
});
