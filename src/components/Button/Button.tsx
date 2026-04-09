import { Pressable, Text, ActivityIndicator } from 'react-native';

/**
 * Button 컴포넌트
 *
 * 기능:
 * - onPress
 * - disabled
 * - loading
 */
export const Button = ({ onPress, disabled, loading, children }: any) => {
  return (
    <Pressable onPress={onPress} disabled={disabled || loading}>
      {loading ? <ActivityIndicator /> : <Text>{children}</Text>}
    </Pressable>
  );
};
