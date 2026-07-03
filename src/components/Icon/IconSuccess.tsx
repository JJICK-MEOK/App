import { View, StyleSheet } from 'react-native';
import VectorSvg from '@/assets/images/Vector.svg';
import { colors } from '@/src/constants/colors';

type Props = {
  size?: number;
};

export default function IconSuccess({ size = 71 }: Props) {
  const iconWidth = Math.round((34 / 71) * size);
  const iconHeight = Math.round((25 / 71) * size);

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <VectorSvg width={iconWidth} height={iconHeight} color={colors.neutral.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
