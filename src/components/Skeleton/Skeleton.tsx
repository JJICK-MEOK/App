import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
}

/**
 * Skeleton 컴포넌트
 * - 로딩 화면용 박스 UI
 * - width, height props로 재사용 가능
 *
 * @example
 * <Skeleton width={100} height={20} />
 * <Skeleton width={'80%'} height={15} />
 */
export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 20 }) => {
  return <View style={[styles.skeleton, { width, height } as ViewStyle]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
});
