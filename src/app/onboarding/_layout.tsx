import { Stack, useSegments } from 'expo-router';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/colors';

export default function OnboardingLayout() {
  const segments = useSegments();
  const isStep3 = segments.at(-1) === 'step3';
  const edges: Edge[] = isStep3 ? [] : ['top'];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isStep3 ? 'transparent' : colors.neutral.white }}
      edges={edges}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
