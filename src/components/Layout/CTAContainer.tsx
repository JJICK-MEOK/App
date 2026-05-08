import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardVisible } from '@/src/hooks/useKeyboardVisible';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function CTAContainer({ children, style }: Props) {
  const insets = useSafeAreaInsets();
  const keyboardVisible = useKeyboardVisible();

  return (
    <View
      style={[style, { paddingBottom: keyboardVisible ? 16 : Math.max(insets.bottom + 16, 45) }]}
    >
      {children}
    </View>
  );
}
