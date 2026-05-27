import { useState } from 'react';
import { useRouter } from 'expo-router';
import { postKakaoLogin } from '@/src/api/auth';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

export const useKakaoLogin = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [showWebView, setShowWebView] = useState(false);

  const login = () => setShowWebView(true);

  const handleCode = async (code: string) => {
    setShowWebView(false);
    try {
      const { accessToken, refreshToken, registrationStatus } = await postKakaoLogin(code);
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);

      if (registrationStatus === 'NOT_STARTED') {
        router.replace('/onboarding/step1');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (error: any) {
      console.error('[useKakaoLogin] login error:', error?.response?.data ?? error);
    }
  };

  return { login, showWebView, onCode: handleCode, onClose: () => setShowWebView(false) };
};
