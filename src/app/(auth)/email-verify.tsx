import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';

export default function EmailVerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');

  const isValid = code.length === 6;

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
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
      </View>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="인증번호 확인"
          onPress={() => router.push('/(auth)/password')}
          variant="dark"
          disabled={!isValid}
        />
        <View style={styles.resendRow}>
          <Typography size="sm" color="secondary">
            인증번호를 받지 못했나요?
          </Typography>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <Typography size="sm" weight="bold" style={styles.resendLink}>
              재전송
            </Typography>
          </TouchableOpacity>
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
