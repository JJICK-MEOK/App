import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import Checkbox from '@/src/components/Icon/Checkbox';
import { TextField } from '@/src/components/Input/TextField';
import { colors } from '@/src/constants/colors';
import { radius, spacing } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

const CONDITIONS = [
  { key: 'length', label: '8자 이상', check: (pw: string) => pw.length >= 8 },
  { key: 'letter', label: '영문 포함', check: (pw: string) => /[a-zA-Z]/.test(pw) },
  { key: 'number', label: '숫자 포함', check: (pw: string) => /[0-9]/.test(pw) },
  { key: 'special', label: '특수문자 포함', check: (pw: string) => /[^a-zA-Z0-9]/.test(pw) },
] as const;

export default function PasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const conditionsMet = CONDITIONS.map((c) => c.check(password));
  const allMet = conditionsMet.every(Boolean);
  const passwordsMatch = password.length > 0 && password === confirm;
  const confirmError =
    confirm.length > 0 && !passwordsMatch ? '비밀번호가 일치하지 않아요' : undefined;
  const isComplete = allMet && passwordsMatch;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ArrowLeftBar onPress={() => router.back()} title="비밀번호 만들기" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>비밀번호</Text>
            <TextField
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={password}
              onChangeText={setPassword}
              secureText
            />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextField
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirm}
              onChangeText={setConfirm}
              secureText
              errorMessage={confirmError}
            />
          </View>
        </View>

        <View style={styles.conditionsBox}>
          <Text style={styles.conditionsTitle}>비밀번호 조건</Text>
          {CONDITIONS.map((condition, i) => (
            <View key={condition.key} style={styles.conditionRow}>
              <Checkbox checked={conditionsMet[i]} readOnly size={24} />
              <Text style={[styles.conditionText, conditionsMet[i] && styles.conditionTextMet]}>
                {condition.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.cta}>
          <BottomCTA
            label="회원가입 완료"
            onPress={() => router.push('/onboarding/step1')}
            variant="primary"
            disabled={!isComplete}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: 63,
    paddingBottom: 45,
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
  conditionsBox: {
    marginTop: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 8,
  },
  conditionsTitle: {
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  conditionText: {
    fontFamily: typography.family.base,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    color: colors.text.tertiary,
  },
  conditionTextMet: {
    color: colors.text.primary,
  },
  cta: {
    marginTop: 32,
  },
});
