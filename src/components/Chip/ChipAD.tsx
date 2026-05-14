import { View, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export default function ChipAD() {
  return (
    <View style={styles.container}>
      <Typography size="xs" style={styles.text}>
        AD
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.text.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
