import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { postEmailVerifyCode, postEmailSendCode } from '@/src/api/auth';

export default function EmailVerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const isValid = code.length === 6;

  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: () => postEmailVerifyCode(email ?? '', code),
    onSuccess: () => {
      router.push({ pathname: '/(auth)/password', params: { email } });
    },
    onError: (error: any) => {
      const errorCode = error?.response?.data?.code;
      if (errorCode === 'INVALID_EMAIL_CODE') {
        setCodeError('인증번호가 올바르지 않습니다.');
      } else if (errorCode === 'EMAIL_CODE_EXPIRED') {
        setCodeError('인증번호가 만료되었습니다. 재전송해주세요.');
      } else if (errorCode === 'EMAIL_ALREADY_EXISTS') {
        setCodeError('이미 가입된 이메일입니다.');
      } else {
        setCodeError('인증에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const { mutate: resendCode, isPending: isResending } = useMutation({
    mutationFn: () => postEmailSendCode(email ?? ''),
    onSuccess: () => {
      setCodeError('');
      setResendMessage('인증번호를 재전송했습니다.');
    },
    onError: (error: any) => {
      const errorCode = error?.response?.data?.code;
      if (errorCode === 'EMAIL_CODE_RATE_LIMITED') {
        setResendMessage('잠시 후 다시 시도해주세요.');
      } else {
        setResendMessage('재전송에 실패했습니다.');
      }
    },
  });

  return (
    <ScreenLayout withKeyboard style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="이메일 인증" />

      <View style={styles.content}>
        <Typography size="sm" color="tertiary" style={styles.description}>
          입력한 이메일로 인증번호를 보내드렸어요
        </Typography>

        <View style={styles.fields}>
          <TextField value={email ?? ''} disabled />
          <TextField
            placeholder="인증번호 6자리"
            value={code}
            onChangeText={(text) => {
              setCode(text);
              setCodeError('');
            }}
            keyboardType="number-pad"
            maxLength={6}
            errorMessage={codeError || undefined}
          />
        </View>
      </View>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="인증번호 확인"
          onPress={() => verifyCode()}
          variant="dark"
          disabled={!isValid || isVerifying}
        />
        <View style={styles.resendRow}>
          {resendMessage ? (
            <Typography size="sm" color="secondary">
              {resendMessage}
            </Typography>
          ) : (
            <>
              <Typography size="sm" color="secondary">
                인증번호를 받지 못했나요?
              </Typography>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => resendCode()}
                disabled={isResending}
              >
                <Typography size="sm" weight="bold" style={styles.resendLink}>
                  재전송
                </Typography>
              </TouchableOpacity>
            </>
          )}
        </View>
      </CTAContainer>
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
    paddingTop: 26,
  },
  description: {
    marginBottom: 15,
  },
  fields: {
    gap: 13,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingTop: 16,
    gap: spacing.md,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },
  resendLink: {
    textDecorationLine: 'underline',
  },
});
