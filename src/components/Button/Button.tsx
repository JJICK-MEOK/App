import { Pressable, ActivityIndicator } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';

export const Button = ({ onPress, disabled, loading, children }: any) => {
  return (
    <Pressable onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator />
      ) : typeof children === 'string' || typeof children === 'number' ? (
        <Typography>{children}</Typography>
      ) : (
        children
      )}
    </Pressable>
  );
};
