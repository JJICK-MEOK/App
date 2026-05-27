import { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={[{ flex: 1 }, style]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={insets.top}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  return <View style={[{ flex: 1 }, style]}>{children}</View>;
}
