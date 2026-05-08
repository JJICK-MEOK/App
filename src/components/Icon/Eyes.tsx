import { SvgProps } from 'react-native-svg';
import EyeOnSvg from '@/assets/images/EyeOn.svg';
import EyeOffSvg from '@/assets/images/EyeOff.svg';

type Props = SvgProps & {
  visible?: boolean;
  size?: number;
};

export default function Eyes({ visible = true, size = 20, ...props }: Props) {
  const SvgIcon = visible ? EyeOnSvg : EyeOffSvg;
  return <SvgIcon width={size} height={size} {...props} />;
}
