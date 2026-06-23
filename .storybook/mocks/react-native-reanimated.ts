import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export const useSharedValue = (initial: any) => {
  const ref = React.useRef({ value: initial });
  return ref.current;
};

export const useAnimatedStyle = (factory: () => any) => {
  try {
    return factory();
  } catch {
    return {};
  }
};

export const withSpring = (value: any) => value;

export const withTiming = (value: any, _opts?: any, callback?: () => void) => {
  if (callback) setTimeout(callback, 0);
  return value;
};

export const withRepeat = (value: any) => value;
export const withSequence = (...values: any[]) => values[values.length - 1];

export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  in: (_e: any) => (t: number) => t,
  out: (_e: any) => (t: number) => t,
  inOut: (_e: any) => (t: number) => t,
  bezier: () => (t: number) => t,
};

export const runOnJS = (fn: any) => fn;
export const runOnUI = (fn: any) => fn;

export const interpolate = (value: number, input: number[], output: number[]) => {
  if (value <= input[0]) return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];
  for (let i = 1; i < input.length; i++) {
    if (value <= input[i]) {
      const t = (value - input[i - 1]) / (input[i] - input[i - 1]);
      return output[i - 1] + t * (output[i] - output[i - 1]);
    }
  }
  return output[output.length - 1];
};

export const Extrapolation = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
} as const;

const Animated = {
  View,
  Text,
  Image,
  ScrollView,
  createAnimatedComponent: (component: any) => component,
};

export default Animated;
