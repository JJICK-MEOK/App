import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Search from '@/assets/images/Search.svg';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  name: string;
  onSearchPress?: () => void;
};

export default function AppBar({ name, onSearchPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Typography size="xxl" weight="semiBold" style={styles.text}>
            {name}님
          </Typography>
          <Typography size="xxl" weight="semiBold" style={styles.text}>
            어떤 활동에 끌리세요?
          </Typography>
        </View>
        <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7} hitSlop={12}>
          <Search width={28} height={28} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 21,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  text: {
    lineHeight: 24,
  },
});
