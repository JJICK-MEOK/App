import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { TextField } from '@/src/components/Input/TextField';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const isValid = email.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ArrowLeftBar onPress={() => router.back()} title="이메일로 회원가입" />

      <View style={styles.content}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>이메일 주소</Text>
          <TextField
            placeholder="이메일 주소를 입력해주세요"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            helperText="올바른 이메일 형식으로 입력해주세요"
          />
        </View>
      </View>

      <View style={styles.cta}>
        <BottomCTA
          label="계속하기"
          onPress={() => router.push({ pathname: '/(auth)/email-verify', params: { email } })}
          variant="dark"
          disabled={!isValid}
        />
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
    paddingTop: 63,
  },
  fieldGroup: {
    gap: 9,
  },
  label: {
    fontFamily: typography.family.base,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 45,
    paddingTop: 16,
  },
});
