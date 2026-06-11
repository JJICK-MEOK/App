import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import IconSuccess from '@/src/components/Icon/IconSuccess';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';

export default function SignupCompleteScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding/step1');
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ScreenLayout style={styles.container}>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <ArrowLeftBar onPress={() => router.back()} title="회원가입 완료" />
      <View style={styles.progressWrapper}>
        <ProgressBar step={4} />
      </View>
      <View style={styles.content}>
        <View style={styles.centerGroup}>
          <IconSuccess size={71} />
          <View style={styles.textGroup}>
            <Typography size="xxxl" weight="semiBold" style={styles.title}>
              찍먹 계정이 만들어졌어요!
            </Typography>
            <Typography size="md" weight="medium" color="secondary" style={styles.subtitle}>
              {'나에게 맞는 활동을 추천받기 위해\n프로필 정보를 입력해보세요!'}
            </Typography>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
  },
  progressWrapper: {
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  centerGroup: {
    alignItems: 'center',
    gap: 15,
  },
  textGroup: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
