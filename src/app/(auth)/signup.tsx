import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { postEmailSendCode } from '@/src/api/auth';

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

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [serverError, setServerError] = useState('');

  const emailValid = isValidEmail(email);

  const emailError = emailTouched
    ? email.length === 0
      ? '이메일을 입력해주세요.'
      : !emailValid
        ? '올바른 이메일 형식으로 입력해주세요.'
        : undefined
    : undefined;

  const displayError = emailError || serverError || undefined;

  const { mutate: sendCode, isPending } = useMutation({
    mutationFn: () => postEmailSendCode(email),
    onSuccess: (data) => {
      setServerError('');
      router.push({
        pathname: '/(auth)/email-verify',
        params: { email, expiresIn: String(data.expiresIn) },
      });
    },
    onError: (error: any) => {
      console.error('[signup] sendCode error:', error?.response?.data ?? error);
      const code = error?.response?.data?.code;
      if (code === 'EMAIL_ALREADY_EXISTS' || code === 'COMMON_409') {
        setServerError('이미 가입되어 있는 이메일이에요.');
      } else {
        setServerError('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  return (
    <ScreenLayout withKeyboard style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="이메일로 회원가입" />

      <View style={styles.content}>
        <View style={styles.fieldGroup}>
          <Typography size="xl" weight="bold">
            {'이메일을\n입력해 주세요'}
          </Typography>
          <TextField
            placeholder="이메일 주소를 입력해주세요"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setServerError('');
            }}
            onBlur={() => setEmailTouched(true)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            helperText={!displayError ? '올바른 이메일 형식으로 입력해주세요' : undefined}
            errorMessage={displayError}
          />
        </View>
      </View>

      <View style={styles.cta}>
        <BottomCTA
          label="계속하기"
          onPress={() => sendCode()}
          variant="dark"
          disabled={!emailValid || isPending}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 63,
  },
  fieldGroup: {
    gap: 9,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingTop: 72,
  },
});
