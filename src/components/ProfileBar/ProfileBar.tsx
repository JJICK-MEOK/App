import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CloseSvg from '@/assets/images/Close.svg';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

type Props = {
  title: string;
  onClose: () => void;
};

export default function ProfileBar({ title, onClose }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onClose} activeOpacity={0.7} hitSlop={12}>
        <CloseSvg width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  placeholder: {
    width: 30,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
});
