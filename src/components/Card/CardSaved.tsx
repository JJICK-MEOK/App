import { useState } from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import HeartSaved from '@/assets/images/HeartSaved.svg';
import HeartUnselected from '@/assets/images/HeartUnselected.svg';
import { colors } from '@/src/constants/colors';

type TagVariant = 'MOOD' | 'INTENSITY' | 'DURATION' | 'SIZE' | 'PURPOSE';

type Tag = {
  label: string;
  variant: TagVariant;
};

type Props = {
  dday: string;
  title: string;
  tags: Tag[];
  initialSaved?: boolean;
  imageSource?: ImageSourcePropType;
};

export default function CardSaved({ dday, title, tags, initialSaved = true, imageSource }: Props) {
  const [saved, setSaved] = useState(initialSaved);

  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        {imageSource && (
          <Image source={imageSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
        )}
        <TouchableOpacity onPress={() => setSaved((v) => !v)} activeOpacity={0.7} style={styles.heartContainer}>
          {saved ? (
            <HeartSaved width={23} height={20} />
          ) : (
            <HeartUnselected width={29} height={29} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Typography size="lg" weight="semiBold" style={styles.title} numberOfLines={2}>
            {title}
          </Typography>
          <Typography size="sm" weight="semiBold" style={styles.dday}>
            {dday}
          </Typography>
        </View>
        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <ChipBadge key={index} label={tag.label} variant={tag.variant} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 11,
  },
  imageArea: {
    height: 150,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 7,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  content: {
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    color: colors.text.primary,
  },
  dday: {
    width: 27,
    color: colors.text.primary,
    textAlign: 'right',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  heartContainer: {
    width: 29,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
