import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { postLogin } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

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
  const { setToken } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loginError, setLoginError] = useState('');

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

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => postLogin(email, password),
    onSuccess: async ({ accessToken, refreshToken }) => {
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      const code = error?.response?.data?.code;
      if (code === 'INVALID_LOGIN') {
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (code === 'USER_INACTIVE') {
        setLoginError('사용할 수 없는 계정입니다.');
      } else {
        setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

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
          {loginError ? (
            <Typography size="sm" color="error" style={styles.loginError}>
              {loginError}
            </Typography>
          ) : null}
          <BottomCTA
            label="로그인"
            onPress={() => login()}
            variant="dark"
            disabled={!isFormValid || isPending}
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
  loginError: {
    textAlign: 'center',
  },
});
