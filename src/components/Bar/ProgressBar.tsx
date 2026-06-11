import { View, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';

type Step = 1 | 2 | 3 | 4;

type Props = {
  step: Step;
  totalSteps?: number;
};

export default function ProgressBar({ step, totalSteps = 4 }: Props) {
  const progress = Math.min(step / totalSteps, 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 2,
    backgroundColor: colors.border.default,
    borderRadius: 1,
  },
  fill: {
    height: 2,
    backgroundColor: colors.primary.main,
    borderRadius: 1,
  },
});
