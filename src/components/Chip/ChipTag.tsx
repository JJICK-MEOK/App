import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  onPress?: () => void;
};

export default function ChipTag({ label, onPress }: Props) {
  const content = (
    <View style={styles.container}>
      <Typography size="xs">{label}</Typography>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
