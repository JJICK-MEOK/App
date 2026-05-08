import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomCTA as BottomCTAButton } from '@/src/components/Button/BottomCTA';

type LayoutBottomCTAProps = {
  label: string;
  onPress: () => void;
  variant?: 'white' | 'primary' | 'dark';
  disabled?: boolean;
};

export const BottomCTA = ({ label, onPress, variant, disabled }: LayoutBottomCTAProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: Math.max(45, insets.bottom + 16) }]}>
      <BottomCTAButton label={label} onPress={onPress} variant={variant} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
});
