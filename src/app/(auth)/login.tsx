import { Dimensions, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { handleGoogleLogin } from '@/src/components/GoogleWebView/GoogleWebView';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import SocialLoginButton from '@/src/components/Button/SocialLoginButton';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { useKakaoLogin } from '@/src/hooks/useKakaoLogin';
import { KakaoWebView } from '@/src/components/KakaoWebView/KakaoWebView';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function LoginScreen() {
  const router = useRouter();
  const { login, showWebView, onWebViewSuccess, onWebViewClose } = useKakaoLogin();

  return (
    <LinearGradient
      colors={[colors.primary.main, colors.primary.sub, colors.primary.light]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <Typography size="xxxl" weight="bold" style={styles.title}>
        {'나에게 맞는\n새로운 경험의 시작'}
      </Typography>
      <View style={styles.circleWrapper}>
        <View style={styles.circleRow}>
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
        </View>
      </View>
      <View style={styles.socialButtons}>
        <SocialLoginButton provider="naver" onPress={() => {}} />
        <SocialLoginButton provider="google" onPress={handleGoogleLogin} />
        <SocialLoginButton provider="kakao" onPress={login} />
      </View>

      {showWebView && <KakaoWebView onSuccess={onWebViewSuccess} onClose={onWebViewClose} />}

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Typography size="lg" color="secondary">
          또는
        </Typography>
        <View style={styles.dividerLine} />
      </View>

      <CTAContainer>
        <BottomCTA
          label="이메일로 시작하기"
          onPress={() => router.push('/(auth)/email-login')}
          variant="white"
        />
      </CTAContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    lineHeight: 32,
    marginTop: 121,
    paddingBottom: 59,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 31,
    marginTop: 'auto',
    marginBottom: 27,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 23,
    marginBottom: 27,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.default,
  },
  circleWrapper: {
    width: SCREEN_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 59,
    marginLeft: -20,
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
});
