import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import ArrowDownSvg from '@/assets/images/ArrowDown.svg';
import { colors } from '@/src/constants/colors';

type Props = {
  label: string;
  onPress: () => void;
};

export const Dropdown = ({ label, onPress }: Props) => {
  return (
    <Pressable style={styles.trigger} onPress={onPress}>
      <Typography size="md" weight="regular" style={styles.label}>
        {label}
      </Typography>
      <View style={styles.iconClip}>
        <ArrowDownSvg width={24} height={24} fill={colors.text.primary} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: colors.neutral.surface,
    borderRadius: 5,
  },
  label: {
    color: colors.text.primary,
    textAlign: 'center',
  },
  iconClip: {
    width: 11,
    height: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
