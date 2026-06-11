import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import Checkbox from '@/src/components/Icon/Checkbox';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { colors } from '@/src/constants/colors';
import { radius, spacing } from '@/src/constants/spacing';
import { postLogin, postSignup } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

const CONDITIONS = [
  { key: 'length', label: '8자 이상', check: (pw: string) => pw.length >= 8 },
  { key: 'letter', label: '영문 포함', check: (pw: string) => /[a-zA-Z]/.test(pw) },
  { key: 'number', label: '숫자 포함', check: (pw: string) => /[0-9]/.test(pw) },
  { key: 'special', label: '특수문자 포함', check: (pw: string) => /[^a-zA-Z0-9]/.test(pw) },
] as const;

export default function PasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { setToken } = useAuthStore();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [signupError, setSignupError] = useState('');
  const [completed, setCompleted] = useState(false);

  const conditionsMet = CONDITIONS.map((c) => c.check(password));
  const allMet = conditionsMet.every(Boolean);
  const passwordsMatch = password.length > 0 && password === confirm;
  const confirmError =
    confirm.length > 0 && !passwordsMatch ? '비밀번호가 일치하지 않아요' : undefined;
  const isComplete = allMet && passwordsMatch;

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async () => {
      await postSignup(email ?? '', password);
      const { accessToken, refreshToken } = await postLogin(email ?? '', password);
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);
    },
    onSuccess: () => {
      setCompleted(true);
      router.push('/(auth)/profile-setup');
    },
    onError: (error: any) => {
      console.error('[password] signup error:', error?.response?.data ?? error);
      const code = error?.response?.data?.code;
      if (code === 'EMAIL_ALREADY_EXISTS') {
        setSignupError('이미 가입된 이메일입니다.');
      } else {
        setSignupError('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  return (
    <ScreenLayout withKeyboard style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="비밀번호 만들기" />
      <View style={styles.progressWrapper}>
        <ProgressBar step={2} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Typography size="lg" weight="medium" style={styles.title}>
          {'비밀번호를\n입력해 주세요'}
        </Typography>

        <View style={styles.fields}>
          <TextField placeholder="••••••••" value={password} onChangeText={setPassword} secureText />
          <TextField
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirm}
            onChangeText={setConfirm}
            secureText
            errorMessage={confirmError}
          />
        </View>

        <View style={styles.conditionsBox}>
          <Typography size="sm" weight="medium" style={styles.conditionsTitle}>
            비밀번호 조건
          </Typography>
          {CONDITIONS.map((condition, i) => (
            <View key={condition.key} style={styles.conditionRow}>
              <Checkbox checked={conditionsMet[i]} readOnly size={24} />
              <Typography
                size="sm"
                weight="medium"
                style={{ color: conditionsMet[i] ? colors.text.primary : colors.text.tertiary }}
              >
                {condition.label}
              </Typography>
            </View>
          ))}
        </View>
      </ScrollView>

      <CTAContainer style={styles.cta}>
        {signupError ? (
          <Typography size="sm" color="error" style={styles.errorText}>
            {signupError}
          </Typography>
        ) : null}
        <BottomCTA
          label="회원가입 완료"
          onPress={() => completed ? router.push('/(auth)/profile-setup') : signup()}
          variant="dark"
          disabled={!isComplete || isPending}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
  },
  progressWrapper: {
    paddingHorizontal: spacing.xl,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: 38,
    paddingBottom: 16,
  },
  title: {
    lineHeight: 24,
    marginBottom: 19,
  },
  fields: {
    gap: 13,
  },
  conditionsBox: {
    marginTop: 44,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 8,
  },
  conditionsTitle: {
    marginBottom: spacing.xs,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingTop: 16,
    gap: spacing.sm,
  },
  errorText: {
    textAlign: 'center',
  },
});
