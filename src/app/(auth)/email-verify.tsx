import { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { postEmailVerifyCode, postEmailSendCode } from '@/src/api/auth';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function EmailVerifyScreen() {
  const router = useRouter();
  const { email, expiresIn: expiresInParam } = useLocalSearchParams<{
    email: string;
    expiresIn: string;
  }>();
  const initialDuration = useRef(parseInt(expiresInParam ?? '180', 10));

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialDuration.current);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isExpired = timeLeft === 0;
  const isValid = code.length === 6 && !isExpired;

  const startTimer = useCallback((duration: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(duration);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer(initialDuration.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    if (isExpired) {
      setCodeError('유효시간이 만료되었습니다. 다시 시도해주세요.');
    }
  }, [isExpired]);

  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: () => postEmailVerifyCode(email ?? '', code),
    onSuccess: () => {
      router.push({ pathname: '/(auth)/password', params: { email } });
    },
    onError: (error: any) => {
      console.error('[email-verify] verifyCode error:', error?.response?.data ?? error);
      const errorCode = error?.response?.data?.code;
      if (errorCode === 'INVALID_EMAIL_CODE') {
        setCodeError('인증번호가 올바르지 않습니다.');
      } else if (errorCode === 'EMAIL_CODE_EXPIRED') {
        setCodeError('유효시간이 만료되었습니다. 다시 시도해주세요.');
      } else if (errorCode === 'EMAIL_ALREADY_EXISTS') {
        setCodeError('이미 가입된 이메일입니다.');
      } else {
        setCodeError('인증에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const { mutate: resendCode, isPending: isResending } = useMutation({
    mutationFn: () => postEmailSendCode(email ?? ''),
    onSuccess: (data) => {
      setCode('');
      setCodeError('');
      setResendMessage('인증번호를 재전송했습니다.');
      startTimer(data.expiresIn);
    },
    onError: (error: any) => {
      console.error('[email-verify] resendCode error:', error?.response?.data ?? error);
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
              if (!isExpired) setCodeError('');
            }}
            keyboardType="number-pad"
            maxLength={6}
            errorMessage={codeError || undefined}
            rightElement={
              <Typography size="xs" style={styles.timer}>
                {formatTime(timeLeft)}
              </Typography>
            }
          />
        </View>
      </View>

      <View style={styles.cta}>
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
    paddingTop: 64,
  },
  description: {
    marginBottom: 15,
  },
  fields: {
    gap: 13,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingTop: 96,
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
  timer: {
    color: colors.text.error,
  },
});
