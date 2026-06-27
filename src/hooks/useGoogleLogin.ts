import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { postGoogleLogin } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

const GOOGLE_AUTH_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth/google`;
const GOOGLE_REDIRECT_URI = 'jjick-meok://auth/callback';

export const useGoogleLogin = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const login = async () => {
    const result = await WebBrowser.openAuthSessionAsync(GOOGLE_AUTH_URL, GOOGLE_REDIRECT_URI);
    if (result.type !== 'success') return;

    const { queryParams } = Linking.parse(result.url);
    const token = queryParams?.token as string;
    if (!token) return;

    try {
      const { accessToken, refreshToken, registrationStatus } = await postGoogleLogin(token);
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);

      router.replace(
        registrationStatus === 'NOT_STARTED' ? '/(auth)/profile-setup' : '/(tabs)/home',
      );
    } catch (error: any) {
      console.error('[useGoogleLogin] error:', error?.response?.data ?? error);
    }
  };

  return { login };
};
