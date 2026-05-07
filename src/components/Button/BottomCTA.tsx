import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

type BottomCTAVariant = 'white' | 'primary' | 'dark';

type BottomCTAProps = {
  label: string;
  onPress: () => void;
  variant?: BottomCTAVariant;
  disabled?: boolean;
};

const backgroundColors: Record<BottomCTAVariant, string> = {
  white: colors.neutral.white,
  primary: colors.primary.sub,
  dark: colors.text.primary,
};

const textColors: Record<BottomCTAVariant, string> = {
  white: colors.text.primary,
  primary: colors.text.primary,
  dark: colors.neutral.white,
};

export const BottomCTA = ({
  label,
  onPress,
  variant = 'white',
  disabled = false,
}: BottomCTAProps) => {
  const bgColor = disabled ? '#EAEAEA' : backgroundColors[variant];
  const textColor = disabled ? colors.neutral.white : textColors[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bgColor },
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 55,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.regular,
    textAlign: 'center',
  },
});
