import { api } from '@/src/lib/api';

interface SendCodeResponse {
  email: string;
  expiresIn: number;
}

export const postEmailSendCode = async (email: string): Promise<SendCodeResponse> => {
  const { data } = await api.post('/auth/email/send-code', { email });
  return data.data;
};

interface VerifyCodeResponse {
  email: string;
  verified: boolean;
}

export const postEmailVerifyCode = async (
  email: string,
  code: string,
): Promise<VerifyCodeResponse> => {
  const { data } = await api.post('/auth/email/verify-code', { email, code });
  return data.data;
};

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  registrationStatus: 'NOT_STARTED' | 'PROFILE_COMPLETED';
}

export const postLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
};

export const postHandoff = async (handoffToken: string): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/handoff', { handoffToken });
  return data.data;
};


interface SignupResponse {
  userId: number;
  email: string;
}

export const postSignup = async (email: string, password: string): Promise<SignupResponse> => {
  const { data } = await api.post('/auth/signup', { email, password });
  return data.data;
};
