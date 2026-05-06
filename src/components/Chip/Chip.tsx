import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function Chip({ label, selected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: 'rgba(255, 242, 166, 0.5)',
  },
  selected: {
    backgroundColor: colors.primary.main,
  },
  label: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
  },
});
