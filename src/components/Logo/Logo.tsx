import { SvgProps } from 'react-native-svg';
import LOGO from '@/assets/images/LOGO.svg';
import LOGO_1 from '@/assets/images/LOGO_1.svg';
import LOGO_02_1 from '@/assets/images/LOGO_02 1.svg';
import LOGO01_5 from '@/assets/images/LOGO01_5.svg';
import LOGO_3 from '@/assets/images/LOGO_3.svg';
import LOGO_4 from '@/assets/images/LOGO_4.svg';

export type LogoVariant = 'LOGO' | 'LOGO_1' | 'LOGO_02_1' | 'LOGO01_5' | 'LOGO_3' | 'LOGO_4';

const LOGO_MAP: Record<LogoVariant, React.ComponentType<SvgProps>> = {
  LOGO,
  LOGO_1,
  LOGO_02_1,
  LOGO01_5,
  LOGO_3,
  LOGO_4,
};

type Props = SvgProps & {
  variant?: LogoVariant;
  width?: number;
  height?: number;
};

export default function Logo({ variant = 'LOGO', width = 240, height = 249, ...props }: Props) {
  const LogoSvg = LOGO_MAP[variant];
  return <LogoSvg width={width} height={height} {...props} />;
}
