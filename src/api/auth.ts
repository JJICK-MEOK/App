import { api } from '@/src/lib/api';

interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
  };
}

export const postGoogleLogin = async (code: string): Promise<SocialLoginResponse> => {
  const { data } = await api.post('/auth/google', { code });
  return data;
};

export const postKakaoLogin = async (
  code: string,
  redirectUri: string,
): Promise<SocialLoginResponse> => {
  const { data } = await api.post('/auth/kakao', { code, redirectUri });
  return data;
};
