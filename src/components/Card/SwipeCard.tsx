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
import { colors } from '@/src/constants/colors';

const SCREEN_WIDTH = Math.min(Dimensions.get('window').width, 430);
export const CARD_WIDTH = SCREEN_WIDTH - 40;
export const CARD_HEIGHT = Math.round(CARD_WIDTH * (444 / 335));

const BORDER_GRADIENT_COLORS = ['#28FFD9', '#FF5EAD', '#8B5CF6', '#28FFD9'] as const;
const BORDER_DURATION = 8000;

function cardBgColor(scale: number): string {
  if (scale >= 1) return '#BEBEBE';
  if (scale >= 0.9) return '#A9A9A9';
  return '#848484';
}

export type TagType = 'mood' | 'intensity' | 'duration' | 'groupSize' | 'purpose';

export type Tag = {
  label: string;
  type: TagType;
};

export type Activity = {
  id: string;
  title: string;
  days: number;
  tags: Tag[];
  imageUrl?: string;
};

type Props = {
  activity: Activity;
  /** Front=1.0, Middle=0.9, Back=0.81 */
  scale?: number;
  saved?: boolean;
  onSave?: () => void;
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
  const [webDeg, setWebDeg] = useState(0);

  useEffect(() => {
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
  }, [angle]);

  const spinnerSize = Math.ceil(Math.sqrt(w * w + h * h)) + 10;

  const nativeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value * 360}deg` }],
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

export default function SwipeCard({ activity, scale = 1, saved = false, onSave }: Props) {
  const w = CARD_WIDTH * scale;
  const h = CARD_HEIGHT * scale;
  const br = 10 * scale;
  const bg = cardBgColor(scale);

  const inner = (
    <>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.98)', 'rgba(0,0,0,0.98)']}
        locations={[0, 0.556, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.overlay, { height: h * 0.488 }]}
      />
      <View
        style={[
          styles.content,
          {
            top: h * 0.7154,
            paddingHorizontal: 14 * scale,
            gap: 12 * scale,
          },
        ]}
      >
        <View style={{ gap: 5 * scale }}>
          <Text style={[styles.semiBold, { fontSize: 12 * scale }]}>D-{activity.days}</Text>
          <Text style={[styles.semiBold, { fontSize: 20 * scale }]} numberOfLines={2}>
            {activity.title}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={[styles.tags, { gap: 5 * scale }]}>
            {activity.tags.map((tag) => (
              <View
                key={`${tag.type}-${tag.label}`}
                style={[
                  styles.tagChip,
                  {
                    backgroundColor: colors.tag[tag.type].bg,
                    paddingHorizontal: 8 * scale,
                    paddingVertical: 4 * scale,
                    borderRadius: 5 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    { fontSize: 12 * scale, color: colors.tag[tag.type].text },
                  ]}
                >
                  #{tag.label}
                </Text>
              </View>
            ))}
          </View>
          <IconHeart saved={saved} size={29 * scale} onPress={onSave} />
        </View>
      </View>
    </>
  );

  if (scale === 1) {
    return (
      <AnimatedGradientBorder w={w} h={h} borderRadius={br} bgColor={bg}>
        {inner}
      </AnimatedGradientBorder>
    );
  }

  return (
    <View style={[styles.card, { width: w, height: h, borderRadius: br, backgroundColor: bg }]}>
      {inner}
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
  tagChip: {
    alignSelf: 'flex-start',
  },
  tagText: {
    fontFamily: 'Pretendard-Medium',
  },
});
