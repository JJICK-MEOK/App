import { useRef } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

const KAKAO_REDIRECT_URI = 'http://jjikmeok/oauth/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.EXPO_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

type Props = {
  visible: boolean;
  onCode: (code: string) => void;
  onClose: () => void;
};

export const KakaoWebView = ({ visible, onCode, onClose }: Props) => {
  const handled = useRef(false);

  const handleNavigationChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    if (!url.startsWith(KAKAO_REDIRECT_URI)) return;
    if (handled.current) return;

    const code = new URL(url).searchParams.get('code');
    if (code) {
      handled.current = true;
      console.log('[KakaoWebView] code:', code);
      onCode(code);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      onShow={() => {
        handled.current = false;
      }}
    >
      <WebView
        source={{ uri: KAKAO_AUTH_URL }}
        onNavigationStateChange={handleNavigationChange}
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        originWhitelist={['https://*', 'http://*']}
        style={styles.webview}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
