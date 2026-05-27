import { Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

export type LocationPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'middle';

type LocationButtonProps = {
  label: string;
  position?: LocationPosition;
  selected?: boolean;
  selectedColor?: string;
  defaultBg?: string;
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
  defaultBg,
  onPress,
}: LocationButtonProps) => {
  const selectedBg = selectedColor ?? colors.primary.sub;
  const unselectedBg = defaultBg ?? colors.neutral.white;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        borderRadiusByPosition[position],
        { backgroundColor: selected ? selectedBg : unselectedBg },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Typography size="md" style={styles.label}>
        {label}
      </Typography>
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
    textAlign: 'center',
  },
});
