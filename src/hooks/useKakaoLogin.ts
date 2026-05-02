import { useState } from 'react';
import { postKakaoLogin } from '@/src/api/auth';
import { KAKAO_REDIRECT_URI } from '@/src/components/KakaoWebView/KakaoWebView';
import { tokenStorage } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/store/authStore';

export const useKakaoLogin = () => {
  const [showWebView, setShowWebView] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const login = () => setShowWebView(true);

  const handleCode = async (code: string) => {
    setShowWebView(false);
    try {
      const { accessToken, refreshToken, user } = await postKakaoLogin(code, KAKAO_REDIRECT_URI);
      await Promise.all([
        tokenStorage.saveAccessToken(accessToken),
        tokenStorage.saveRefreshToken(refreshToken),
      ]);
      setToken(accessToken);
      setUser(user);
    } catch (error) {
      console.error('Kakao login failed', error);
      throw error;
    }
  };

  return {
    login,
    showWebView,
    onWebViewSuccess: handleCode,
    onWebViewClose: () => setShowWebView(false),
  };
};
