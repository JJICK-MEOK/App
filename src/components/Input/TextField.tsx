import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
import { typography } from '@/src/constants/typography';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  errorMessage?: string;
};

export const TextField = ({ errorMessage, ...props }: TextFieldProps) => {
  const hasError = !!errorMessage;

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, hasError && styles.inputError]}
        placeholderTextColor={colors.text.tertiary}
        {...props}
      />
      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 7,
  },
  input: {
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 10,
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    lineHeight: 20,
  },
  inputError: {
    borderColor: colors.text.error,
  },
  errorText: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.regular,
    color: colors.text.error,
  },
});
