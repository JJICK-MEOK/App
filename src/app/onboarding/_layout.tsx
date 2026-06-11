import { Stack, useSegments } from 'expo-router';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/colors';

export default function OnboardingLayout() {
  const segments = useSegments();
  const isStep1 = segments.at(-1) === 'step1';
  const edges: Edge[] = isStep1 ? [] : ['top'];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isStep1 ? 'transparent' : colors.neutral.white }}
      edges={edges}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
