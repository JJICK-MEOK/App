import { Pressable, StyleSheet, View } from 'react-native';
import InsightSvg from '@/assets/images/Insight.svg';
import ArrowRightSvg from '@/assets/images/ArrowRight.svg';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Props = {
  label?: string;
  onPress: () => void;
};

export default function ButtonInsight({ label = '나만의 찍먹 데이터 확인하기', onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <InsightSvg width={24} height={24} />
        <Typography size="md" weight="semiBold" color="tertiary">
          {label}
        </Typography>
      </View>
      <ArrowRightSvg width={6} height={11} color={colors.text.tertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 13,
    backgroundColor: colors.neutral.surface,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
