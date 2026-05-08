import { TouchableOpacity, StyleSheet } from 'react-native';
import AddSvg from '@/assets/images/add.svg';
import { colors } from '@/src/constants/colors';

type Props = {
  selected?: boolean;
  onPress: () => void;
};

export default function AddButton({ selected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <AddSvg width={30} height={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: colors.disabled,
  },
  selected: {
    backgroundColor: colors.primary.sub,
  },
});
