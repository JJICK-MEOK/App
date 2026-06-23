import React from 'react';
import { View } from 'react-native';

const createChain = (): any => {
  const chain: Record<string, () => any> = {};
  [
    'onBegin',
    'onStart',
    'onUpdate',
    'onEnd',
    'onFinalize',
    'onFail',
    'onCancel',
    'withRef',
    'enabled',
    'hitSlop',
    'minPointers',
    'maxPointers',
    'minDistance',
    'activeOffsetX',
    'activeOffsetY',
    'failOffsetX',
    'failOffsetY',
  ].forEach((m) => {
    chain[m] = () => chain;
  });
  return chain;
};

export const Gesture = {
  Pan: createChain,
  Tap: createChain,
  LongPress: createChain,
  Pinch: createChain,
  Rotation: createChain,
  Fling: createChain,
  Simultaneous: (...args: any[]) => args[0] ?? createChain(),
  Race: (...args: any[]) => args[0] ?? createChain(),
  Exclusive: (...args: any[]) => args[0] ?? createChain(),
};

export const GestureDetector = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const GestureHandlerRootView = ({ children, style }: any) => (
  <View style={style}>{children}</View>
);

export const PanGestureHandler = ({ children }: any) => <>{children}</>;
export const TapGestureHandler = ({ children }: any) => <>{children}</>;
export const State = {};
export const Directions = {};
