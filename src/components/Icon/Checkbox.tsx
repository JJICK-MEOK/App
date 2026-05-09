import { TouchableOpacity, View } from 'react-native';
import CheckedSvg from '@/assets/images/CheckboxChecked.svg';
import UncheckedSvg from '@/assets/images/CheckboxUnchecked.svg';

type Props = {
  checked: boolean;
  onPress?: () => void;
  size?: number;
  readOnly?: boolean;
};

export default function Checkbox({ checked, onPress, size = 24, readOnly = false }: Props) {
  const SvgIcon = checked ? CheckedSvg : UncheckedSvg;

  if (readOnly) {
    return (
      <View accessibilityRole="checkbox" accessibilityState={{ checked }}>
        <SvgIcon width={size} height={size} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <SvgIcon width={size} height={size} />
    </TouchableOpacity>
  );
}
