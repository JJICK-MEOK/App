import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { postHandoff } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

const GOOGLE_AUTH_URL = `${process.env.EXPO_PUBLIC_API_URL}/oauth/google/login`;
const GOOGLE_REDIRECT_URI = 'jjikmeok://oauth/google';

export const useGoogleLogin = () => {
  const router = useRouter();
  const { setToken, setRegistrationStatus } = useAuthStore();

  const login = async () => {
    const result = await WebBrowser.openAuthSessionAsync(GOOGLE_AUTH_URL, GOOGLE_REDIRECT_URI);
    if (result.type !== 'success') return;

    const { queryParams } = Linking.parse(result.url);
    const handoffToken = queryParams?.handoffToken as string;
    if (!handoffToken) return;

    try {
      const { accessToken, refreshToken, registrationStatus } = await postHandoff(handoffToken);
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);
      setRegistrationStatus(registrationStatus);

      if (registrationStatus === 'NOT_STARTED') {
        router.replace('/(auth)/profile-setup');
      } else if (registrationStatus === 'PROFILE_COMPLETED') {
        router.replace('/onboarding/step1');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (error: any) {
      console.error('[useGoogleLogin] error:', error?.response?.data ?? error);
    }
  };

  return { login };
};
