import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DefaultActivitySvg from '@/assets/images/DefaultActivity.svg';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import type { Activity, Tag } from '@/src/types/activities';

export type { Activity, Tag };

export const CARD_HEIGHT = 290;

type Props = {
  activity: Activity;
  onPress?: () => void;
};

export default function Curation({ activity, onPress }: Props) {
  const [imageError, setImageError] = useState(false);
  const tags = activity.tags.slice(0, 2);

  useEffect(() => {
    setImageError(false);
  }, [activity.imageUrl]);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {activity.imageUrl && !imageError ? (
        <Image
          source={{ uri: activity.imageUrl }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.defaultImageWrapper]}>
          <DefaultActivitySvg width={CARD_HEIGHT} height={CARD_HEIGHT} />
        </View>
      )}
      <LinearGradient
        colors={['transparent', 'transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
        locations={[0, 0.5118, 0.7833, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text
        style={styles.title}
        numberOfLines={2}
        lineBreakStrategyIOS="hangul-word"
        android_hyphenationFrequency="none"
      >
        {activity.title}
      </Text>
      <View style={styles.tags}>
        {tags.map((tag) => {
          const label = tag.label.startsWith('#') ? tag.label.slice(1) : tag.label;
          return (
            <ChipBadge
              key={`${tag.type}-${tag.label}`}
              label={`#${label}`}
              variant={tag.type}
              dark
            />
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    padding: 13,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 11.622,
    overflow: 'hidden',
    backgroundColor: 'rgba(221,221,221,0.5)',
  },
  defaultImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 22,
    color: '#FFFFFF',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
});
