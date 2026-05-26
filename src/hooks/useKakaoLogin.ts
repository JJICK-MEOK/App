import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import { postKakaoLogin } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
  tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
};

export const useKakaoLogin = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'jjick-meok' });

  const [request, , promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_KAKAO_APP_KEY!,
      redirectUri,
      scopes: ['profile_nickname', 'account_email'],
      responseType: AuthSession.ResponseType.Code,
    },
    discovery,
  );

  const login = async () => {
    if (!request) return;
    try {
      const result = await promptAsync();
      if (result.type !== 'success') return;

      const code = result.params?.code;
      if (!code) throw new Error('Missing Kakao authorization code');

      const { accessToken, refreshToken } = await postKakaoLogin(code);
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Kakao login failed', error);
      throw error;
    }
  };

  return { login, isReady: !!request };
};
