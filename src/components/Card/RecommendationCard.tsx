import { View, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import ChipBadge from '@/src/components/Chip/ChipBadge';

type Props = {
  category: string;
  title: string;
  preferences: [string, string];
};

export default function RecommendationCard({ category, title, preferences }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.upper}>
          {/* 백엔드 연결 시 Image 컴포넌트로 교체 */}
          <View style={styles.image} />
          <View style={styles.infoRow}>
            <ChipBadge label={category} variant="category" />
            <Typography style={styles.dday}>D-7</Typography>
          </View>
        </View>
        <Typography style={styles.title}>{title}</Typography>
      </View>
      <View style={styles.preferences}>
        <ChipBadge label={preferences[0]} variant="mood" />
        <ChipBadge label={preferences[1]} variant="mood" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 143,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  inner: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    gap: 5,
  },
  upper: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    gap: 12,
  },
  image: {
    aspectRatio: 151 / 148,
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: 'rgba(195, 195, 195, 0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#222',
    letterSpacing: 0.32,
    lineHeight: 20,
    alignSelf: 'stretch',
  },
  dday: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    color: '#222',
    textAlign: 'center',
  },
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'stretch',
  },
});
