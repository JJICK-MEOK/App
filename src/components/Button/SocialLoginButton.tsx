import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import NaverSvg from '@/assets/images/Login_Naver.svg';
import KakaoImage from '@/assets/images/Login_Kakao.png';
import GoogleImage from '@/assets/images/Login_Google.png';

type Provider = 'google' | 'kakao' | 'naver';

type Props = {
  provider: Provider;
  onPress: () => void;
  size?: number;
};

const LABEL: Record<Provider, string> = {
  google: '구글로 로그인',
  kakao: '카카오로 로그인',
  naver: '네이버로 로그인',
};

const SIZE = 55;

export default function SocialLoginButton({ provider, onPress, size = SIZE }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={LABEL[provider]}
    >
      {provider === 'naver' ? (
        <NaverSvg width={size} height={size} />
      ) : (
        <Image
          source={provider === 'kakao' ? KakaoImage : GoogleImage}
          style={[styles.image, { width: size, height: size }]}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: SIZE,
    height: SIZE,
  },
});
