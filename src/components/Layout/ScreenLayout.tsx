import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  withKeyboard?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ScreenLayout({ children, withKeyboard = false, style }: Props) {
  const insets = useSafeAreaInsets();

  if (withKeyboard) {
    return (
      <KeyboardAvoidingView
        style={[{ flex: 1 }, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }

  return <View style={[{ flex: 1 }, style]}>{children}</View>;
}
