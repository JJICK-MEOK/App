import { Text, TextProps } from 'react-native';
import { typography } from '@/src/constants/typography';
import { colors } from '@/src/constants/colors';

type FontSize = keyof typeof typography.size;
type FontWeight = keyof typeof typography.weight;
type TextColor = keyof typeof colors.text;

type TypographyProps = TextProps & {
  size?: FontSize;
  weight?: FontWeight;
  color?: TextColor;
};

export const Typography = ({
  size = 'md',
  weight = 'regular',
  color = 'primary',
  style,
  ...props
}: TypographyProps) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          fontFamily: 'Pretendard',
          fontWeight: typography.weight[weight],
          fontSize: typography.size[size],
          color: colors.text[color],
          includeFontPadding: false,
        },
        style,
      ]}
      {...props}
    />
  );
};
