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
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const hasError = !!errorMessage;

  const bgColor = hasError ? '#F8E7E7' : colors.neutral.surface;
  const borderColor = hasError ? colors.text.error : 'transparent';
  const textColor = disabled ? colors.disabled : colors.text.primary;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, { borderColor, backgroundColor: bgColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholderTextColor={disabled ? colors.disabled : colors.text.tertiary}
          secureTextEntry={secureText && !isPasswordVisible}
          editable={!disabled}
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
        <Typography size="sm" weight="medium" color="error">
          {errorMessage}
        </Typography>
      )}
      {!hasError && helperText && (
        <Typography size="sm" weight="medium" color="tertiary">
          {helperText}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 41,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: 15,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    textAlignVertical: 'center',
    outlineWidth: 0,
  },
});
