import React from 'react';
import { View } from 'react-native';

type Props = {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: any;
  children?: React.ReactNode;
};

export const LinearGradient = ({ colors, start, end, style, children }: Props) => {
  const angle =
    start && end
      ? Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90
      : 180;
  const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;

  return <View style={[style, { background: gradient } as any]}>{children}</View>;
};

export default LinearGradient;
