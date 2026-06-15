import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function GenderButton({ label, selected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <Typography size="md" weight={selected ? 'medium' : 'regular'} color={selected ? 'primary' : 'tertiary'}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 99,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  default: {
    backgroundColor: colors.neutral.surface,
  },
  selected: {
    backgroundColor: colors.primary.main,
  },
});
