import { Image, Pressable, StyleSheet, View } from 'react-native';
import ChipBadge, { ChipBadgeVariant } from '@/src/components/Chip/ChipBadge';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

export type ContentCardTag = {
  label: string;
  variant: ChipBadgeVariant;
};

type ContentCardProps = {
  title: string;
  subtitle: string;
  imageUri?: string;
  tags: ContentCardTag[];
  onPress?: () => void;
  renderFallback?: () => React.ReactNode;
};

export const ContentCard = ({
  title,
  subtitle,
  imageUri,
  tags,
  onPress,
  renderFallback,
}: ContentCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && onPress && styles.pressed]}
      onPress={onPress}
      disabled={!onPress}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.image}>{renderFallback?.()}</View>
      )}

      <View style={styles.info}>
        <View style={styles.titleArea}>
          <Typography size="lg" weight="semiBold" color="primary">
            {title}
          </Typography>
          <Typography size="sm" weight="medium" color="secondary">
            {subtitle}
          </Typography>
        </View>

        <View style={styles.tags}>
          {tags.map((tag, index) => (
            <ChipBadge key={index} label={tag.label} variant={tag.variant} />
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    gap: 20,
    width: 334,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.neutral.surface,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    gap: 14,
  },
  titleArea: {
    gap: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});
