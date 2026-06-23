import { TouchableOpacity } from 'react-native';
import HeartOutlineSvg from '@/assets/images/heart-outline.svg';
import HeartFilledSvg from '@/assets/images/heart-filled.svg';

type Props = {
  saved?: boolean;
  size?: number;
  color?: string;
  onPress?: () => void;
  onPressIn?: () => void;
};

export default function IconHeart({ saved = false, size = 29, color = '#fff', onPress, onPressIn }: Props) {
  return (
    <TouchableOpacity onPressIn={onPressIn} onPress={onPress} hitSlop={8} activeOpacity={0.7}>
      {saved ? (
        <HeartFilledSvg width={size} height={size} />
      ) : (
        <HeartOutlineSvg width={size} height={size} color={color} />
      )}
    </TouchableOpacity>
  );
}
