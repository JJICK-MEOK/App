import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

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
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelDefault]}>
        {label}
      </Text>
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
  label: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  labelDefault: {
    color: colors.text.tertiary,
  },
  labelSelected: {
    color: colors.text.primary,
  },
});
