import { TouchableOpacity, View, StyleSheet } from 'react-native';
import ArrowLeftSvg from '@/assets/images/ArrowLeft.svg';
import { colors } from '@/src/constants/colors';

type Props = {
  onPress: () => void;
};

export default function ArrowLeftBar({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={12}>
        <ArrowLeftSvg width={10} height={18.5} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 22,
    paddingVertical: 3,
    justifyContent: 'center',
  },
});
