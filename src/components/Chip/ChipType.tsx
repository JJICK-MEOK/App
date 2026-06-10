import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function ChipType({ label, selected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <Typography size="lg" weight="medium" color={selected ? 'primary' : 'tertiary'}>
        #{label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: colors.neutral.surface,
  },
  selected: {
    backgroundColor: colors.primary.main,
  },
});
