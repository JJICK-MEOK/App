import { TouchableOpacity } from 'react-native';
import CloseLargeSvg from '@/assets/images/CloseLarge.svg';
import CloseSmallSvg from '@/assets/images/CloseSmall.svg';

type Variant = 'md' | 'sm';

type Props = {
  variant?: Variant;
  onPress: () => void;
};

export default function Close({ variant = 'md', onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={8}>
      {variant === 'md' ? (
        <CloseLargeSvg width={30} height={30} />
      ) : (
        <CloseSmallSvg width={10} height={10} />
      )}
    </TouchableOpacity>
  );
}
