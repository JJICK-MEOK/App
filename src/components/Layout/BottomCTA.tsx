import { StyleSheet, View } from 'react-native';
import { BottomCTA as BottomCTAButton } from '@/src/components/Button/BottomCTA';

type LayoutBottomCTAProps = {
  label: string;
  onPress: () => void;
  variant?: 'white' | 'primary' | 'dark';
  disabled?: boolean;
};

export const BottomCTA = ({ label, onPress, variant, disabled }: LayoutBottomCTAProps) => {
  return (
    <View style={styles.container}>
      <BottomCTAButton label={label} onPress={onPress} variant={variant} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 45,
    paddingHorizontal: 20,
  },
});
