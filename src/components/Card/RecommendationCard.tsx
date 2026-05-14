import { View, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import DDay from '@/src/components/Field/DDay';
import ChipBadge from '@/src/components/Chip/ChipBadge';

type Props = {
  category: string;
  days: number;
  title: string;
  preferences: [string, string];
};

export default function RecommendationCard({ category, days, title, preferences }: Props) {
  return (
    <View style={styles.container}>
      {/* 백엔드 연결 시 Image 컴포넌트로 교체 */}
      <View style={styles.image} />
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <ChipBadge label={category} variant="activityCategory" />
          <DDay days={days} style={styles.dday} />
        </View>
        <Typography size="xl" weight="bold" style={styles.title}>
          {title}
        </Typography>
        <View style={styles.preferences}>
          <ChipBadge label={preferences[0]} variant="preference" />
          <ChipBadge label={preferences[1]} variant="preference" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 151,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  image: {
    height: 148,
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
  },
  content: {
    alignSelf: 'stretch',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  title: {
    color: '#222',
    lineHeight: 26,
    marginTop: 14,
    alignSelf: 'stretch',
  },
  dday: {
    fontSize: 10,
    color: '#222',
    textAlign: 'center',
  },
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'stretch',
    marginTop: 10,
  },
});
