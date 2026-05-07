import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ArrowLeftSvg from '@/assets/images/ArrowLeft.svg';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

type Props = {
  onPress: () => void;
  title?: string;
};

export default function ArrowLeftBar({ onPress, title }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={12}>
        <ArrowLeftSvg width={10} height={18.5} />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 22,
    paddingVertical: 3,
    gap: 10,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: typography.family.base,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    includeFontPadding: false,
    lineHeight: typography.size.xl,
  },
});
