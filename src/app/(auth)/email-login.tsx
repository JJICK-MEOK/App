import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { TextField } from '@/src/components/Input/TextField';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

export default function EmailLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim().length > 0 && password.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ArrowLeftBar onPress={() => router.back()} title="이메일로 로그인" />

      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>이메일</Text>
            <TextField
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>비밀번호</Text>
            <TextField
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureText
            />
          </View>
        </View>

        <View style={styles.ctaArea}>
          <BottomCTA
            label="로그인"
            onPress={() => router.replace('/(tabs)')}
            variant="dark"
            disabled={!isFormValid}
          />
          <View style={styles.signupSection}>
            <Text style={styles.signupCaption}>아직 계정이 없나요?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')} activeOpacity={0.7}>
              <Text style={styles.signupLink}>이메일로 회원가입</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 63,
  },
  form: {
    gap: 32,
  },
  fieldGroup: {
    gap: 9,
  },
  label: {
    fontFamily: typography.family.base,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed,
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
  signupCaption: {
    fontFamily: typography.family.base,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
  },
  signupLink: {
    fontFamily: typography.family.base,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textDecorationLine: 'underline',
  },
});
