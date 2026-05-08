import { Text, TextProps, StyleSheet } from 'react-native';
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
        styles.base,
        {
          fontSize: typography.size[size],
          fontWeight: typography.weight[weight],
          color: colors.text[color],
        },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.family.base,
    includeFontPadding: false,
  },
});
