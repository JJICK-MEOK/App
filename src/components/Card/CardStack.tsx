import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import SwipeCard, { CARD_WIDTH, CARD_HEIGHT } from './SwipeCard';
import type { Activity } from './SwipeCard';

const GAP = 7;
const BACK_SCALE = 0.81;
// 모든 카드가 CARD_WIDTH 물리 크기 → CSS transform scale 적용
// CSS scale은 중심 기준 → 시각적 좌측 끝 = translateX + CARD_WIDTH*(1-BACK_SCALE)/2
// 7px 갭을 위해: SLOT = CARD_WIDTH*(1+BACK_SCALE)/2 + GAP
const SLOT = Math.round((CARD_WIDTH * (1 + BACK_SCALE)) / 2) + GAP;
const SWIPE_THRESHOLD = CARD_WIDTH * 0.3;
const VELOCITY_THRESHOLD = 800;

type Props = {
  activities: Activity[];
  onPressCard?: (activity: Activity) => void;
  onSwipe?: (activity: Activity, direction: 'left' | 'right') => void;
  onEndReached?: () => void;
};

export default function CardStack({ activities, onPressCard, onSwipe, onEndReached }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const panOffset = useSharedValue(0);

  const handleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const current = activities[currentIndex];
  const prev = activities[currentIndex - 1];
  const next = activities[currentIndex + 1];

  const goLeft = useCallback(() => {
    const newIndex = currentIndex + 1;
    onSwipe?.(activities[currentIndex], 'left');
    setCurrentIndex(newIndex);
    if (activities.length - newIndex <= 3) onEndReached?.();
  }, [activities, currentIndex, onSwipe, onEndReached]);

  const goRight = useCallback(() => {
    const newIndex = currentIndex - 1;
    onSwipe?.(activities[currentIndex], 'right');
    setCurrentIndex(newIndex);
  }, [activities, currentIndex, onSwipe]);

  useLayoutEffect(() => {
    panOffset.value = 0;
  }, [currentIndex, panOffset]);

  const heartActiveRef = useRef(false);

  const navigateToDetail = useCallback(() => {
    const wasHeart = heartActiveRef.current;
    heartActiveRef.current = false;
    if (current && !wasHeart) onPressCard?.(current);
  }, [onPressCard, current]);

  const handleHeartPressIn = useCallback(() => {
    heartActiveRef.current = true;
  }, []);

  const prevStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -SLOT + panOffset.value },
      {
        scale: interpolate(panOffset.value, [0, SLOT], [BACK_SCALE, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  const currentStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: panOffset.value },
      {
        scale: interpolate(
          panOffset.value,
          [-SLOT, 0, SLOT],
          [BACK_SCALE, 1, BACK_SCALE],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const nextStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: SLOT + panOffset.value },
      {
        scale: interpolate(panOffset.value, [-SLOT, 0], [1, BACK_SCALE], Extrapolation.CLAMP),
      },
    ],
  }));

  const tap = Gesture.Tap().onEnd((_e, success) => {
    if (success) scheduleOnRN(navigateToDetail);
  });

  const pan = Gesture.Pan()
    .minDistance(5)
    .onUpdate((e) => {
      panOffset.value = e.translationX;
    })
    .onEnd((e) => {
      const shouldGoLeft =
        e.translationX < -SWIPE_THRESHOLD || e.velocityX < -VELOCITY_THRESHOLD;
      const shouldGoRight =
        e.translationX > SWIPE_THRESHOLD || e.velocityX > VELOCITY_THRESHOLD;

      if (shouldGoLeft && next) {
        panOffset.value = withSpring(
          -SLOT,
          { velocity: e.velocityX, damping: 20, stiffness: 180, overshootClamping: true },
          () => scheduleOnRN(goLeft),
        );
      } else if (shouldGoRight && prev) {
        panOffset.value = withSpring(
          SLOT,
          { velocity: e.velocityX, damping: 20, stiffness: 180, overshootClamping: true },
          () => scheduleOnRN(goRight),
        );
      } else {
        panOffset.value = withSpring(0, { damping: 40, stiffness: 300 });
      }
    });

  const gesture = Gesture.Exclusive(pan, tap);

  if (!current) return null;

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        {prev && (
          <Animated.View key={prev.id} style={[styles.card, prevStyle]}>
            <SwipeCard activity={prev} saved={savedIds.has(prev.id)} onSave={() => handleSave(prev.id)} />
          </Animated.View>
        )}
        {next && (
          <Animated.View key={next.id} style={[styles.card, nextStyle]}>
            <SwipeCard activity={next} saved={savedIds.has(next.id)} onSave={() => handleSave(next.id)} />
          </Animated.View>
        )}
        <Animated.View key={current.id} style={[styles.card, currentStyle]}>
          <SwipeCard
            activity={current}
            isFront
            saved={savedIds.has(current.id)}
            onSave={() => handleSave(current.id)}
            onHeartPressIn={handleHeartPressIn}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    overflow: 'visible',
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
