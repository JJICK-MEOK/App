import { SvgProps } from 'react-native-svg';
import CheckSvg from '@/assets/images/Check.svg';
import ArrowDownSvg from '@/assets/images/ArrowDown.svg';
import AddSvg from '@/assets/images/add.svg';

const iconMap = {
  check: CheckSvg,
  arrowDown: ArrowDownSvg,
  add: AddSvg,
} as const;

export type IconName = keyof typeof iconMap;

const defaultSize: Record<IconName, number> = {
  check: 90,
  arrowDown: 30,
  add: 30,
};

type Props = SvgProps & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size, ...props }: Props) {
  const SvgIcon = iconMap[name];
  const resolvedSize = size ?? defaultSize[name];

  return <SvgIcon width={resolvedSize} height={resolvedSize} {...props} />;
}
