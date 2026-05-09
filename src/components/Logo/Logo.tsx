import { SvgProps } from 'react-native-svg';
import LogoSvg from '@/assets/images/Logo.svg';

type Props = SvgProps & {
  width?: number;
  height?: number;
};

export default function Logo({ width = 240, height = 249, ...props }: Props) {
  return <LogoSvg width={width} height={height} {...props} />;
}
