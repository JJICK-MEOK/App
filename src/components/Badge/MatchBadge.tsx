import { View, Text, StyleSheet } from 'react-native';
import MatchSvg from '@/assets/images/Match.svg';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';

type Props = {
  percentage?: number | null;
};

export default function MatchBadge({ percentage }: Props) {
  const displayPercentage = percentage ?? 0;
  return (
    <View style={styles.container}>
      <MatchSvg width={18} height={18} />
      <Typography size="md" weight="medium" style={styles.text}>
        취향 일치
        <Text style={styles.percentage}>{` ${displayPercentage}%`}</Text>
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
    padding: 10,
    borderRadius: radius.full,
    backgroundColor: 'rgba(58,58,58,0.8)',
  },
  text: {
    color: colors.neutral.white,
  },
  percentage: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: colors.neutral.white,
  },
});
