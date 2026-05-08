// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri } from 'expo-auth-session';
// import { supabase } from '@/src/lib/supabase';

// WebBrowser.maybeCompleteAuthSession();

// export default function GoogleLogin() {
//   const handleLogin = async () => {
//     // 환경에 맞는 redirectUri 생성
//     const redirectTo = makeRedirectUri({
//       scheme: 'jjick-meok',
//       preferLocalhost: true, // Expo Go에서 테스트할 경우 localhost/exp:// 주소 반환
//     });

//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo, // 반드시 추가해야 앱으로 돌아옴
//         queryParams: {
//           prompt: 'select_account', // 항상 계정 선택창 표시
//         },
//       },
//     });

//     if (error) {
//       console.error('로그인 실패:', error);
//     } else if (data?.url) {
//       console.log('로그인 URL:', data.url);
//       const result = await WebBrowser.openAuthSessionAsync(data.url);
//       console.log('브라우저 결과:', result);
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
//       <Text style={styles.googleButtonText}>Google 로그인</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   googleButton: {
//     backgroundColor: '#4285F4',
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 8,
//     minWidth: 200,
//     alignItems: 'center',
//     marginTop: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   googleButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '@/src/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const handleLogin = async () => {
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

    // 👉 여기서 WebBrowser 절대 쓰지 않음 (중요)
    console.log('OAuth 시작 URL:', data?.url);
  };

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
