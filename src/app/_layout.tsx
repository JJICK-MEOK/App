import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/src/lib/queryClient';
import { useAuthStore } from '@/src/store/authStore';

export default function AppLayout() {
  const { initAuth, accessToken, isInitialized } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === 'login';
    if (!accessToken && !inAuthGroup) {
      router.replace('/login');
    } else if (accessToken && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isInitialized, accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
