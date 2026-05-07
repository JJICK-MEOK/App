import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

export type LocationPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'middle';

type LocationButtonProps = {
  label: string;
  position?: LocationPosition;
  selected?: boolean;
  selectedColor?: string;
  onPress: () => void;
};

const borderRadiusByPosition: Record<LocationPosition, object> = {
  topLeft: { borderTopLeftRadius: 20 },
  topRight: { borderTopRightRadius: 20 },
  bottomLeft: { borderBottomLeftRadius: 20 },
  bottomRight: { borderBottomRightRadius: 20 },
  middle: {},
};

export const LocationButton = ({
  label,
  position = 'middle',
  selected = false,
  selectedColor,
  onPress,
}: LocationButtonProps) => {
  const selectedBg = selectedColor ?? colors.primary.sub;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        borderRadiusByPosition[position],
        { backgroundColor: selected ? selectedBg : colors.neutral.white },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 83,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: colors.neutral.white,
    borderRightColor: colors.neutral.white,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
