import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '@/src/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export async function handleGoogleLogin() {
  const redirectTo = makeRedirectUri({
    scheme: 'jjick-meok',
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        prompt: 'select_account',
      },
    },
  });

  if (error) {
    console.error('로그인 실패:', error);
    return;
  }

  if (data?.url) {
    await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  }
}

export default function GoogleLogin() {
  const handleLogin = handleGoogleLogin;

  return (
    <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
      <Text style={styles.googleButtonText}>Google 로그인</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
