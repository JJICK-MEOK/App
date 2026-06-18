import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import SwipeCard, { CARD_WIDTH, CARD_HEIGHT } from './SwipeCard';
import type { Activity } from './SwipeCard';

const STACK_HEIGHT = Math.round(CARD_HEIGHT * (477 / 444));
const FRONT_TOP = Math.round(CARD_HEIGHT * (33 / 444));
const MIDDLE_TOP = Math.round(CARD_HEIGHT * (15.65 / 444));

const SWIPE_THRESHOLD = CARD_WIDTH * 0.3;
const VELOCITY_THRESHOLD = 800;

type Props = {
  activities: Activity[];
  onSwipe?: (activity: Activity, direction: 'left' | 'right') => void;
  onEndReached?: () => void;
};

function SwipableCard({
  activity,
  onSwipedOff,
}: {
  activity: Activity;
  onSwipedOff: (direction: 'left' | 'right') => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      {
        rotate: `${interpolate(
          translateX.value,
          [-CARD_WIDTH, 0, CARD_WIDTH],
          [-15, 0, 15],
        )}deg`,
      },
    ],
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.5;
    })
    .onEnd((e) => {
      const shouldSwipe =
        Math.abs(e.translationX) > SWIPE_THRESHOLD ||
        Math.abs(e.velocityX) > VELOCITY_THRESHOLD;

      if (shouldSwipe) {
        const dir = e.translationX > 0 ? 'right' : 'left';
        const targetX = dir === 'right' ? CARD_WIDTH * 2.5 : -CARD_WIDTH * 2.5;
        translateX.value = withTiming(targetX, { duration: 300 }, () => {
          runOnJS(onSwipedOff)(dir);
        });
        translateY.value = withTiming(translateY.value + 40, { duration: 300 });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.frontCard, animatedStyle]}>
        <SwipeCard activity={activity} scale={1} />
      </Animated.View>
    </GestureDetector>
  );
}

export default function CardStack({ activities, onSwipe, onEndReached }: Props) {
  const [startIndex, setStartIndex] = useState(0);

  const handleSwipedOff = useCallback(
    (direction: 'left' | 'right') => {
      const nextIndex = startIndex + 1;
      onSwipe?.(activities[startIndex], direction);
      setStartIndex(nextIndex);
      if (activities.length - nextIndex <= 3) {
        onEndReached?.();
      }
    },
    [activities, startIndex, onSwipe, onEndReached],
  );

  const front = activities[startIndex];
  const middle = activities[startIndex + 1];
  const back = activities[startIndex + 2];

  if (!front) return null;

  return (
    <View style={styles.container}>
      {back && (
        <View style={styles.backCard}>
          <SwipeCard activity={back} scale={0.81} />
        </View>
      )}
      {middle && (
        <View style={styles.middleCard}>
          <SwipeCard activity={middle} scale={0.9} />
        </View>
      )}
      <SwipableCard key={front.id} activity={front} onSwipedOff={handleSwipedOff} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: STACK_HEIGHT,
    overflow: 'visible',
  },
  backCard: {
    position: 'absolute',
    top: 0,
    left: CARD_WIDTH * ((1 - 0.81) / 2),
  },
  middleCard: {
    position: 'absolute',
    top: MIDDLE_TOP,
    left: CARD_WIDTH * ((1 - 0.9) / 2),
  },
  frontCard: {
    position: 'absolute',
    top: FRONT_TOP,
    left: 0,
  },
});
