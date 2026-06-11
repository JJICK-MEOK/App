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

const fontFamilyMap: Record<FontWeight, string> = {
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  semiBold: 'Pretendard-SemiBold',
  bold: 'Pretendard-Bold',
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
          fontFamily: fontFamilyMap[weight],
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
