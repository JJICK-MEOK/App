import { Pressable, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';

export type ModalButtonVariant = 'primary' | 'secondary';

type Props = {
  label: string;
  variant?: ModalButtonVariant;
  onPress: () => void;
};

const backgroundColors: Record<ModalButtonVariant, string> = {
  primary: colors.text.primary,
  secondary: colors.border.light,
};

const textColors: Record<ModalButtonVariant, string> = {
  primary: colors.neutral.white,
  secondary: colors.text.secondary,
};

export default function ModalButton({ label, variant = 'primary', onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      style={[styles.button, { backgroundColor: backgroundColors[variant] }]}
    >
      <Typography size="lg" weight="medium" style={{ color: textColors[variant] }}>
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 163,
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
