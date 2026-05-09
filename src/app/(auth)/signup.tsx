import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { TextField } from '@/src/components/Input/TextField';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const isValid = email.trim().length > 0;

  return (
    <ScreenLayout withKeyboard style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="이메일로 회원가입" />

      <View style={styles.content}>
        <View style={styles.fieldGroup}>
          <Typography size="lg" weight="bold">
            이메일을 입력해 주세요
          </Typography>
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

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="계속하기"
          onPress={() => router.push({ pathname: '/(auth)/email-verify', params: { email } })}
          variant="dark"
          disabled={!isValid}
        />
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
    paddingTop: 63,
  },
  fieldGroup: {
    gap: 9,
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingTop: 16,
  },
});
