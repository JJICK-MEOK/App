import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export default function OnboardingStep3() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#FFF7CC', '#FFF2A6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Typography size="xxxl" weight="bold" style={styles.title}>
          {'내가 뭘 좋아하는지\n아직 잘 모르겠다면?'}
        </Typography>
      </View>

      <View style={styles.circleWrapper}>
        <View style={styles.circleRow}>
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
        </View>
      </View>

      <CTAContainer style={styles.cta}>
        <Text style={styles.ctaSubText}>
          <Text style={styles.ctaBold}>1분만에</Text>
          <Text style={styles.ctaRegular}> 나에게 맞는 활동 찾기</Text>
        </Text>
        <BottomCTA
          label="추천받기"
          onPress={() => router.push('/onboarding/step4')}
          variant="white"
        />
      </CTAContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 147,
  },
  title: {
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 32,
  },
  circleWrapper: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 59,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  topicImage: {
    width: 135,
    height: 135,
    borderRadius: 135,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: '#D9D9D9',
  },
  cta: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  ctaSubText: {
    textAlign: 'center',
  },
  ctaBold: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.primary,
  },
  ctaRegular: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: colors.text.primary,
  },
});
