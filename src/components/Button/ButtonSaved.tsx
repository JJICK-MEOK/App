import { TouchableOpacity, View, StyleSheet } from 'react-native';
import HeartDisabled from '@/assets/images/HeartDisabled.svg';
import HeartSaved from '@/assets/images/HeartSaved.svg';
import { colors } from '@/src/constants/colors';

type Props = {
  saved?: boolean;
  onPress: () => void;
};

export default function ButtonSaved({ saved = false, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <View style={styles.iconWrapper}>{saved ? <HeartSaved /> : <HeartDisabled />}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    paddingTop: 11,
    paddingRight: 10,
    paddingBottom: 9,
    paddingLeft: 10,
    borderRadius: 24,
    backgroundColor: colors.neutral.surface,
    alignItems: 'flex-start',
    gap: 10,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
