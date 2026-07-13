import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

// 백엔드가 소셜 로그인 완료 후 팝업을 이 경로로 리다이렉트하면,
// maybeCompleteAuthSession이 현재 URL을 opener 창(openAuthSessionAsync 호출부)으로 postMessage하고 팝업을 닫는다.
export default function OAuthCallback() {
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  return null;
}
