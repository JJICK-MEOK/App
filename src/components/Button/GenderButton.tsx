import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function GenderButton({ label, selected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.selected : styles.default]}
    >
      <Typography
        size="md"
        style={{
          color: selected ? colors.text.primary : colors.text.tertiary,
          lineHeight: typography.lineHeight.normal,
        }}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 99,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.neutral.white,
  },
  default: {
    borderColor: colors.border.default,
  },
  selected: {
    borderColor: colors.text.secondary,
  },
});
