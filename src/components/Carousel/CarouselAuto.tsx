import { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';

const ITEM_SIZE = 136;
const GAP = 9;
const SET_WIDTH = (ITEM_SIZE + GAP) * 6;

type Props = {
  images?: string[];
  duration?: number;
};

export default function CarouselAuto({ images = [], duration = 10000 }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;

  const normalized =
    images.length === 0
      ? Array(6).fill(null)
      : Array.from({ length: 6 }, (_, i) => images[i % images.length] ?? null);
  const looped = [...normalized, ...normalized];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -SET_WIDTH,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [duration]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.strip, { transform: [{ translateX }] }]}>
        {looped.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            {uri ? <Image source={{ uri }} style={styles.image} /> : null}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_SIZE,
    overflow: 'hidden',
  },
  strip: {
    flexDirection: 'row',
    gap: GAP,
  },
  imageWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
    flexShrink: 0,
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
});
