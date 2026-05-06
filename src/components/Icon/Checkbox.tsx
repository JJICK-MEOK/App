import { TouchableOpacity } from 'react-native';
import CheckedSvg from '@/assets/images/CheckboxChecked.svg';
import UncheckedSvg from '@/assets/images/CheckboxUnchecked.svg';

type Props = {
  checked: boolean;
  onPress: () => void;
  size?: number;
};

export default function Checkbox({ checked, onPress, size = 24 }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {checked ? (
        <CheckedSvg width={size} height={size} />
      ) : (
        <UncheckedSvg width={size} height={size} />
      )}
    </TouchableOpacity>
  );
}
