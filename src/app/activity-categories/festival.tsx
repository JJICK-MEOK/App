import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { colors } from '@/src/constants/colors';

export default function FestivalListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScreenLayout style={{ backgroundColor: colors.neutral.white, paddingTop: insets.top }}>
      <ArrowLeftBar onPress={() => router.back()} title="행사·강연" />
    </ScreenLayout>
  );
}
