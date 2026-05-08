import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CloseSvg from '@/assets/images/Close.svg';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  title: string;
  onClose: () => void;
};

export default function ProfileBar({ title, onClose }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
      <Typography size="xl" weight="bold" style={styles.title}>
        {title}
      </Typography>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="닫기"
      >
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
  },
});
