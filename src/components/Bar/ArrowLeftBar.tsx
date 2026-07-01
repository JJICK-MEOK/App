import { TouchableOpacity, View, StyleSheet } from 'react-native';
import ArrowLeftSvg from '@/assets/images/ArrowLeft.svg';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  onPress: () => void;
  title?: string;
  showBack?: boolean;
};

export default function ArrowLeftBar({ onPress, title, showBack = true }: Props) {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={12}>
          <ArrowLeftSvg width={10} height={18.5} />
        </TouchableOpacity>
      )}
      {title && (
        <View style={styles.titleWrapper} pointerEvents="none">
          <Typography size="xl" weight="bold" style={styles.title}>
            {title}
          </Typography>
        </View>
      )}
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
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
