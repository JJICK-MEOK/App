import { StyleSheet, TouchableOpacity } from 'react-native';
import ArrowRight from '@/assets/images/ArrowRight.svg';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Props = {
  label: string;
  onPress: () => void;
};

export default function PersonalizedCTA({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <Typography style={styles.label}>{label}</Typography>
      <ArrowRight width={5} height={9} color={colors.text.secondary} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 161,
    height: 36,
    paddingLeft: 15,
    paddingRight: 12,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: colors.primary.main,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: colors.text.primary,
  },
  icon: {
    flexShrink: 0,
  },
});
