import { Stack, useSegments } from 'expo-router';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/colors';

export default function AuthLayout() {
  const segments = useSegments();
  const isLogin = segments.at(-1) === 'login';
  const edges: Edge[] = isLogin ? [] : ['top'];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isLogin ? 'transparent' : colors.neutral.white }}
      edges={edges}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
