import { View, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';

type Step = 1 | 2 | 3 | 4;

type Props = {
  step: Step;
  totalSteps?: number;
};

export default function ProgressBar({ step, totalSteps = 4 }: Props) {
  const progress = step / totalSteps;

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { flex: progress }]} />
      <View style={{ flex: 1 - progress }} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 2,
    backgroundColor: colors.border.default,
    borderRadius: 1,
    flexDirection: 'row',
  },
  fill: {
    height: 2,
    backgroundColor: colors.primary.main,
    borderRadius: 1,
  },
});
