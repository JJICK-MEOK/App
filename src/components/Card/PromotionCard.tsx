import { View, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import DDay from '@/src/components/Field/DDay';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import { colors } from '@/src/constants/colors';

type Props = {
  days: number;
  category: string;
  title: string;
  subtitle: string;
  showAD?: boolean;
};

export default function PromotionCard({ days, category, title, subtitle, showAD = true }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.ddayWrapper}>
            <DDay days={days} style={{ lineHeight: 14 }} />
          </View>
          {showAD && (
            <View style={styles.adWrapper}>
              <ChipBadge label="AD" variant="ad" />
            </View>
          )}
          <View style={!showAD ? { marginLeft: 11 } : undefined}>
            <ChipBadge label={category} variant="categoryDark" />
          </View>
        </View>
        <Typography size="lg" weight="bold" style={styles.title}>
          {title}
        </Typography>
        <Typography size="xs" style={styles.subtitle}>
          {subtitle}
        </Typography>
      </View>
      {/* 백엔드 연결 시 Image 컴포넌트로 교체 */}
      <View style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 60,
  },
  content: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ddayWrapper: {
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  adWrapper: {
    marginLeft: 11,
    marginRight: 4,
    flexShrink: 0,
  },
  title: {
    color: colors.neutral.white,
    alignSelf: 'stretch',
    marginTop: 6,
  },
  subtitle: {
    color: '#888',
    alignSelf: 'stretch',
    marginTop: 3,
  },
  image: {
    width: 78.323,
    height: 78.323,
    aspectRatio: 1,
    borderRadius: 4.895,
    borderWidth: 0.979,
    borderColor: '#EAEAEA',
    backgroundColor: '#CCC',
  },
});
