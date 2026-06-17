import { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
import { Typography } from '@/src/components/Typography/Typography';

export type BottomCTAVariant = 'white' | 'primary' | 'dark';

type BottomCTAProps = {
  label: string;
  onPress: () => void;
  variant?: BottomCTAVariant;
  disabled?: boolean;
};

const backgroundColors: Record<BottomCTAVariant, string> = {
  white: colors.neutral.white,
  primary: colors.primary.sub,
  dark: colors.text.primary,
};

const textColors: Record<BottomCTAVariant, string> = {
  white: colors.text.primary,
  primary: colors.text.primary,
  dark: colors.neutral.white,
};

export const BottomCTA = ({
  label,
  onPress,
  variant = 'white',
  disabled = false,
}: BottomCTAProps) => {
  const bgColor = disabled ? colors.disabled : backgroundColors[variant];
  const textColor = disabled ? colors.neutral.white : textColors[variant];
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <Pressable
        style={[styles.button, { backgroundColor: bgColor }]}
        onPress={handlePress}
        onPressIn={!disabled ? handlePressIn : undefined}
        onPressOut={!disabled ? handlePressOut : undefined}
        disabled={disabled}
      >
        <Typography size="xl" weight="medium" style={[styles.label, { color: textColor }]}>
          {label}
        </Typography>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    textAlign: 'center',
  },
});
