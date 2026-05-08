import { ReactNode, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Eyes from '@/src/components/Icon/Eyes';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';
import { Typography } from '@/src/components/Typography/Typography';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  helperText?: string;
  errorMessage?: string;
  secureText?: boolean;
  rightElement?: ReactNode;
  disabled?: boolean;
};

export const TextField = ({
  helperText,
  errorMessage,
  secureText,
  rightElement,
  disabled,
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

  const bgColor = disabled ? '#F5F5F5' : colors.neutral.white;
  const textColor = disabled ? colors.disabled : colors.text.primary;

  return (
    <View style={[styles.wrapper, hasError ? styles.wrapperError : styles.wrapperDefault]}>
      <View style={[styles.inputRow, { borderColor, backgroundColor: bgColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholderTextColor={disabled ? colors.disabled : colors.text.tertiary}
          secureTextEntry={secureText && !isPasswordVisible}
          editable={!disabled}
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
      {hasError && (
        <Typography size="xs" color="error">
          {errorMessage}
        </Typography>
      )}
      {!hasError && helperText && (
        <Typography size="xs" color="secondary">
          {helperText}
        </Typography>
      )}
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
    outlineWidth: 0,
  },
});
