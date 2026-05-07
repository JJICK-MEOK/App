import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { TextField } from '@/src/components/Input/TextField';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

export default function EmailVerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');

  const isValid = code.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ArrowLeftBar onPress={() => router.back()} title="이메일 인증" />

      <View style={styles.content}>
        <Text style={styles.description}>입력한 이메일로 인증번호를 보내드렸어요</Text>

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

      <View style={styles.cta}>
        <BottomCTA
          label="인증번호 확인"
          onPress={() => router.push('/(auth)/password')}
          variant="dark"
          disabled={!isValid}
        />
        <View style={styles.resendRow}>
          <Text style={styles.resendCaption}>인증번호를 받지 못했나요?</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.resendLink}>재전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 26,
  },
  description: {
    fontFamily: typography.family.base,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 15,
  },
  fields: {
    gap: 57,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 45,
    paddingTop: 16,
    gap: spacing.md,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },
  resendCaption: {
    fontFamily: typography.family.base,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
  },
  resendLink: {
    fontFamily: typography.family.base,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textDecorationLine: 'underline',
  },
});
