import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KakaoWebView } from '@/src/components/KakaoWebView/KakaoWebView';
import { useKakaoLogin } from '@/src/hooks/useKakaoLogin';

export default function LoginScreen() {
  const { login, showWebView, onWebViewSuccess, onWebViewClose } = useKakaoLogin();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>찍먹</Text>
      <TouchableOpacity style={styles.kakaoButton} onPress={login} activeOpacity={0.8}>
        <Text style={styles.kakaoButtonText}>카카오로 시작하기</Text>
      </TouchableOpacity>

      {showWebView && (
        <KakaoWebView onSuccess={onWebViewSuccess} onClose={onWebViewClose} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 48,
    color: '#1A1A1A',
  },
  kakaoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',
    borderRadius: 12,
    paddingVertical: 14,
    width: '80%',
  },
  kakaoButtonText: {
    color: '#3C1E1E',
    fontSize: 16,
    fontWeight: '600',
  },
});
