import { ReactNode, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Eyes from '@/src/components/Icon/Eyes';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  helperText?: string;
  errorMessage?: string;
  secureText?: boolean;
  rightElement?: ReactNode;
};

export const TextField = ({
  helperText,
  errorMessage,
  secureText,
  rightElement,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const hasError = !!errorMessage;

  const borderColor = hasError
    ? colors.text.error
    : isFocused
      ? colors.border.active
      : colors.border.default;

  return (
    <View style={[styles.wrapper, hasError ? styles.wrapperError : styles.wrapperDefault]}>
      <View style={[styles.inputRow, { borderColor }]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry={secureText && !isPasswordVisible}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {secureText && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((v) => !v)}
            activeOpacity={0.7}
            hitSlop={8}
          >
            <Eyes visible={isPasswordVisible} />
          </TouchableOpacity>
        )}
        {!secureText && rightElement}
      </View>
      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
      {!hasError && helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  wrapperDefault: {
    gap: 9,
  },
  wrapperError: {
    gap: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    lineHeight: 20,
  },
  errorText: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.regular,
    color: colors.text.error,
  },
  helperText: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
  },
});
