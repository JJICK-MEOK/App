import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import { postGoogleLogin } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export const useGoogleLogin = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'jjick-meok' });

  const [request, , promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
    },
    discovery,
  );

  const login = async () => {
    const result = await promptAsync();
    if (result.type !== 'success') return;

    const { code } = result.params;
    const { accessToken, refreshToken } = await postGoogleLogin(code);

    await Promise.all([
      tokenStorage.saveAccessToken(accessToken),
      tokenStorage.saveRefreshToken(refreshToken),
    ]);
    setToken(accessToken);
    router.replace('/(tabs)');
  };

  return { login, isReady: !!request };
};
