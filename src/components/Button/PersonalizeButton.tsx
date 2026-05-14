import { StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Props = {
  label: string;
  onPress: () => void;
};

export default function PersonalizeButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <Typography style={styles.label}>{label}</Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.text.primary,
  },
  label: {
    color: colors.neutral.white,
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});
