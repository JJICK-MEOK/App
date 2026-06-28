import { View, StyleSheet, Image } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import { colors } from '@/src/constants/colors';

type Props = {
  category: string;
  title: string;
  showAD?: boolean;
  deadline: number;
  thumbnailUrl?: string;
};

export default function PromotionCard({
  category,
  title,
  showAD = true,
  deadline,
  thumbnailUrl,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.ddayWrapper}>
            <Typography size="sm" weight="semiBold" style={styles.dday}>
              D-{deadline}
            </Typography>
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
        <Typography size="lg" weight="bold" style={styles.title} lineBreakStrategyIOS="hangul-word" android_hyphenationFrequency="none">
          {title}
        </Typography>
      </View>
      {thumbnailUrl ? (
        <Image source={{ uri: thumbnailUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.image} />
      )}
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
  dday: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
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
  image: {
    width: 78,
    height: 78,
    aspectRatio: 1,
    borderRadius: 4.895,
    borderWidth: 0.979,
    borderColor: '#EAEAEA',
    backgroundColor: '#CCC',
  },
});
