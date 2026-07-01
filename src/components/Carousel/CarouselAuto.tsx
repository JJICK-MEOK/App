import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { SvgProps } from 'react-native-svg';

const ITEM_SIZE = 136;
const GAP = 9;

type Props = {
  images?: React.ComponentType<SvgProps>[];
  duration?: number;
};

export default function CarouselAuto({ images = [], duration = 10000 }: Props) {
  const setWidth = (ITEM_SIZE + GAP) * images.length;
  const translateX = useRef(new Animated.Value(0)).current;
  const looped = [...images, ...images, ...images];

  useEffect(() => {
    if (images.length === 0) return;

    const animate = () => {
      translateX.setValue(0);
      Animated.timing(translateX, {
        toValue: -setWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) animate();
      });
    };

    animate();
    return () => translateX.stopAnimation();
  }, [duration, setWidth]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.strip, { transform: [{ translateX }] }]}>
        {looped.map((SvgImage, index) => (
          <View key={index} style={styles.imageWrapper}>
            {SvgImage ? <SvgImage width={ITEM_SIZE} height={ITEM_SIZE} /> : null}
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
