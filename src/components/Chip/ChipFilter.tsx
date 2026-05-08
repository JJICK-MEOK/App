import { TouchableOpacity, View, StyleSheet } from 'react-native';
import CloseSmallSvg from '@/assets/images/CloseSmall.svg';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  onRemove: () => void;
};

export default function ChipFilter({ label, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Typography size="sm">{label}</Typography>
      <TouchableOpacity
        onPress={onRemove}
        activeOpacity={0.7}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel={`${label} 삭제`}
      >
        <CloseSmallSvg width={10} height={10} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
});
