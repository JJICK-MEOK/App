import { Text } from 'react-native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import { queryClient } from '@/src/lib/queryClient';
import { useAuthStore } from '@/src/store/authStore';
import { theme } from '@/src/constants/theme';

(Text as any).defaultProps = { style: { fontFamily: 'Pretendard', includeFontPadding: false } };

export default function AppLayout() {
  const initAuth = useAuthStore((s) => s.initAuth);

  const [fontsLoaded] = useFonts({
    Pretendard: require('@/assets/fonts/PretendardVariable.ttf'),
  });

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
