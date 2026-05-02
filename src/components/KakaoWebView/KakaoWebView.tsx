import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export const KAKAO_REDIRECT_URI = 'http://jjikmeok/oauth/kakao';

const AUTH_URL =
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=${process.env.EXPO_PUBLIC_KAKAO_APP_KEY}` +
  `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
  `&response_type=code`;

interface Props {
  onSuccess: (code: string) => void;
  onClose: () => void;
}

export function KakaoWebView({ onSuccess, onClose }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <Modal animationType="slide" visible onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <Text style={styles.close}>닫기</Text>
          </TouchableOpacity>
          <Text style={styles.title}>카카오 로그인</Text>
          <View style={styles.spacer} />
        </View>

        {loading && (
          <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color="#FEE500" />
        )}

        <WebView
          source={{ uri: AUTH_URL }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onShouldStartLoadWithRequest={(request) => {
            if (request.url.startsWith(KAKAO_REDIRECT_URI)) {
              const match = request.url.match(/[?&]code=([^&]+)/);
              const code = match?.[1];
              if (code) {
                onSuccess(code);
              } else {
                onClose();
              }
              return false;
            }
            return true;
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  close: {
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  spacer: {
    width: 32,
  },
});
