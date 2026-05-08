import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';

export default function EmailLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim().length > 0 && password.length > 0;

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
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
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
              secureText
            />
          </View>
        </View>

        <CTAContainer style={styles.ctaArea}>
          <BottomCTA
            label="로그인"
            onPress={() => router.replace('/(tabs)')}
            variant="dark"
            disabled={!isFormValid}
          />
          <View style={styles.signupSection}>
            <Typography size="sm" color="secondary">
              아직 계정이 없나요?
            </Typography>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')} activeOpacity={0.7}>
              <Typography size="sm" weight="bold" style={styles.signupLink}>
                이메일로 회원가입
              </Typography>
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
  signupLink: {
    textDecorationLine: 'underline',
  },
});
