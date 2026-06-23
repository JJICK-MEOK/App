import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import IconHeart from '@/src/components/Icon/IconHeart';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import type { Activity, Tag } from '@/src/types/activities';

export type { Activity, Tag };
export type { TagType } from '@/src/types/activities';

const SCREEN_WIDTH = Math.min(Dimensions.get('window').width, 430);
export const CARD_WIDTH = SCREEN_WIDTH - 40;
export const CARD_HEIGHT = Math.round(CARD_WIDTH * (444 / 335));

const BORDER_GRADIENT_COLORS = ['#28FFD9', '#FF5EAD', '#8B5CF6', '#28FFD9'] as const;
const BORDER_DURATION = 8000;

type Props = {
  activity: Activity;
  isFront?: boolean;
  saved?: boolean;
  onSave?: () => void;
  onHeartPressIn?: () => void;
};

function AnimatedGradientBorder({
  w,
  h,
  borderRadius,
  bgColor,
  children,
}: {
  w: number;
  h: number;
  borderRadius: number;
  bgColor: string;
  children: React.ReactNode;
}) {
  const angle = useSharedValue(0);
  const borderOpacity = useSharedValue(0);
  const [webDeg, setWebDeg] = useState(0);

  useEffect(() => {
    borderOpacity.value = withTiming(1, { duration: 350, easing: Easing.out(Easing.quad) });
    if (Platform.OS === 'web') {
      let rafId: number;
      let start: number | null = null;
      const tick = (ts: number) => {
        if (start === null) start = ts;
        setWebDeg((((ts - start) % BORDER_DURATION) / BORDER_DURATION) * 360);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }
    angle.value = withRepeat(
      withTiming(1, { duration: BORDER_DURATION, easing: Easing.linear }),
      -1,
      false,
    );
  }, [angle, borderOpacity]);

  const spinnerSize = Math.ceil(Math.sqrt(w * w + h * h)) + 10;

  const nativeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value * 360}deg` }],
    opacity: borderOpacity.value,
  }));

  const spinnerStyle =
    Platform.OS === 'web' ? { transform: [{ rotate: `${webDeg}deg` }] } : nativeStyle;

  return (
    <View style={{ width: w, height: h, borderRadius: borderRadius + 2, overflow: 'hidden' }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: spinnerSize,
            height: spinnerSize,
            top: (h - spinnerSize) / 2,
            left: (w - spinnerSize) / 2,
          },
          spinnerStyle,
        ]}
      >
        <LinearGradient colors={[...BORDER_GRADIENT_COLORS]} style={{ flex: 1 }} />
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          right: 2,
          bottom: 2,
          borderRadius,
          overflow: 'hidden',
          backgroundColor: bgColor,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default function SwipeCard({ activity, isFront = false, saved = false, onSave, onHeartPressIn }: Props) {
  const bg = '#BEBEBE';

  const handleHeartPressIn = () => {
    onSave?.();
    onHeartPressIn?.();
  };

  const inner = (
    <>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.98)', 'rgba(0,0,0,0.98)']}
        locations={[0, 0.556, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.overlay, { height: CARD_HEIGHT * 0.488 }]}
      />
      <View
        style={[
          styles.content,
          {
            top: CARD_HEIGHT * 0.7154,
            paddingHorizontal: 14,
            gap: 12,
          },
        ]}
      >
        <View style={{ gap: 5 }}>
          <Text style={[styles.semiBold, { fontSize: 12 }]}>D-{activity.days}</Text>
          <Text style={[styles.semiBold, { fontSize: 20 }]} numberOfLines={2}>
            {activity.title}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={[styles.tags, { gap: 5 }]}>
            {activity.tags.map((tag) => (
              <ChipBadge
                key={`${tag.type}-${tag.label}`}
                label={`#${tag.label}`}
                variant={tag.type}
                dark
              />
            ))}
          </View>
          <IconHeart saved={saved} size={29} onPressIn={handleHeartPressIn} />
        </View>
      </View>
    </>
  );

  if (isFront) {
    return (
      <AnimatedGradientBorder w={CARD_WIDTH} h={CARD_HEIGHT} borderRadius={10} bgColor={bg}>
        {inner}
      </AnimatedGradientBorder>
    );
  }

  return (
    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 10, backgroundColor: bg }]}>
      <View style={{ position: 'absolute', top: 2, left: 2, right: 2, bottom: 2, borderRadius: 8, overflow: 'hidden' }}>
        {inner}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  semiBold: {
    fontFamily: 'Pretendard-SemiBold',
    color: '#FFFFFF',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 8,
  },
});
