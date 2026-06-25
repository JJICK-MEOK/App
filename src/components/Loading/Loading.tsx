import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 45;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC = CIRCUMFERENCE * (70 / 360);

type Props = {
  visible?: boolean;
};

export const Loading = ({ visible = true }: Props) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    if (visible) anim.start();
    return () => anim.stop();
  }, [visible]);

  if (!visible) return null;

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ width: SIZE, height: SIZE }}>
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#F5F5F5"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
      </Svg>
      <Animated.View style={{ position: 'absolute', transform: [{ rotate }] }}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#FFE066"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={`${ARC} ${CIRCUMFERENCE - ARC}`}
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
