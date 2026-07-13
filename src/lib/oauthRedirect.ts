import { Platform } from 'react-native';

type OAuthProvider = 'kakao' | 'google' | 'naver';

// 네이티브는 커스텀 스킴 딥링크로 돌아오고, 웹은 팝업이 같은 오리진의 콜백 라우트로 돌아와야 한다.
export const getOAuthRedirectUri = (provider: OAuthProvider): string => {
  if (Platform.OS === 'web') {
    return `${window.location.origin}/oauth/${provider}`;
  }
  return `jjikmeok://oauth/${provider}`;
};
