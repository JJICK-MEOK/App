import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface LoadingProps {
  visible: boolean;
  size?: 'small' | 'large';
  color?: string;
}

/**
 * Loading 컴포넌트
 * - visible: boolean으로 표시 여부 결정
 * - size, color props로 커스터마이징 가능
 *
 * @example
 * <Loading visible={true} />
 */
export const Loading: React.FC<LoadingProps> = ({ visible, size = 'large', color = '#007AFF' }) => {
  if (!visible) return null;

  return (
    <View>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
