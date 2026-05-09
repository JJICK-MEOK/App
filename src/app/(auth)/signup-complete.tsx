import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { colors } from '@/src/constants/colors';
import { spacing } from '@/src/constants/spacing';
import Icon from '@/src/components/Icon/Icon';
import { Typography } from '@/src/components/Typography/Typography';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';

export default function SignupCompleteScreen() {
  const router = useRouter();

  return (
    <ScreenLayout style={styles.container}>
      <ArrowLeftBar onPress={() => router.back()} title="회원가입 완료" />
      <View style={styles.content}>
        <View style={styles.checkContainer}>
          <Icon name="check" size={90} />
          <Typography size="xxxl" weight="bold">
            찍먹 계정이 만들어졌어요!
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            {'나에게 맞는 활동을 추천받기 위해 \n프로필 정보를 입력해보세요!'}
          </Typography>
        </View>
      </View>
      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="프로필 정보 입력하기"
          onPress={() => router.push('/onboarding/step1')}
          variant="primary"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    paddingHorizontal: spacing.xl,
    paddingTop: 16,
  },
  checkContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 13,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
  },
});
