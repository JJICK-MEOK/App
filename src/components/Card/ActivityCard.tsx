import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import Eyes from '@/src/components/Icon/Eyes';
import HeartDisabled from '@/assets/images/HeartDisabled.svg';
import { colors } from '@/src/constants/colors';

type TagVariant = 'mood' | 'intensity' | 'duration' | 'groupSize' | 'purpose';

type Tag = {
  label: string;
  variant: TagVariant;
};

type Props = {
  dday: string;
  title: string;
  tags: Tag[];
  viewCount: number;
  likeCount: number;
  imageSource?: ImageSourcePropType;
};

export default function ActivityCard({
  dday,
  title,
  tags,
  viewCount,
  likeCount,
  imageSource,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.titleGroup}>
          <Typography size="sm" weight="semiBold" style={styles.ddayText}>
            {dday}
          </Typography>
          <Typography size="lg" weight="semiBold" style={styles.titleText} lineBreakStrategyIOS="hangul-word" android_hyphenationFrequency="none">
            {title}
          </Typography>
        </View>
        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <ChipBadge key={index} label={tag.label} variant={tag.variant} />
          ))}
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Eyes size={14} color="#CCCCCC" />
            <Typography size="sm" weight="regular" style={styles.statText}>
              {viewCount}
            </Typography>
          </View>
          <View style={styles.statItem}>
            <HeartDisabled width={12} height={11} />
            <Typography size="sm" weight="regular" style={styles.statText}>
              {likeCount}
            </Typography>
          </View>
        </View>
        <View style={styles.imageWrapper}>
          {imageSource ? (
            <Image source={imageSource} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 26,
    width: '100%',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
  },
  titleGroup: {
    flexDirection: 'column',
    gap: 6,
  },
  ddayText: {
    color: colors.text.primary,
  },
  titleText: {
    color: colors.text.primary,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statText: {
    color: '#CCCCCC',
    lineHeight: 12,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderWidth: 0.944,
    borderColor: colors.border.default,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
  },
});
