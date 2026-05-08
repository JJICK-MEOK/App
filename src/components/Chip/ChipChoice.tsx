import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function ChipChoice({ label, selected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <Typography size="lg">{label}</Typography>
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
});
