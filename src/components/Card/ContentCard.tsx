import { Image, Pressable, StyleSheet, View } from 'react-native';
import ChipTag from '@/src/components/Chip/ChipTag';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
import { Typography } from '@/src/components/Typography/Typography';

const SURFACE_COLOR = '#F5F5F5';

type ContentCardProps = {
  title: string;
  subtitle: string;
  imageUri: string;
  tags: string[];
  onPress?: () => void;
};

export const ContentCard = ({ title, subtitle, imageUri, tags, onPress }: ContentCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && onPress && styles.pressed]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.row}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <View style={styles.info}>
          <View style={styles.titleArea}>
            <Typography size="lg" weight="bold">
              {title}
            </Typography>
            <Typography size="sm" color="secondary" numberOfLines={1}>
              {subtitle}
            </Typography>
          </View>

          <View style={styles.tags}>
            {tags.map((tag) => (
              <ChipTag key={tag} label={tag} />
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: SURFACE_COLOR,
    borderRadius: radius.sm,
    padding: 10,
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  image: {
    width: 117,
    height: 117,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: SURFACE_COLOR,
  },
  info: {
    flex: 1,
    gap: 10,
  },
  titleArea: {
    gap: 5,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
});
