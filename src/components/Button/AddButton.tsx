import { TouchableOpacity, StyleSheet } from 'react-native';
import AddSvg from '@/assets/images/add.svg';
import IconSuccess from '@/src/components/Icon/IconSuccess';
import { colors } from '@/src/constants/colors';

type Props = {
  selected?: boolean;
  onPress: () => void;
};

export default function AddButton({ selected = false, onPress }: Props) {
  if (selected) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <IconSuccess size={45} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.default}>
      <AddSvg width={29} height={29} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border.light,
  },
});
