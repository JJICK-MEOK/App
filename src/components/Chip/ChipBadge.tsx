import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Variant = 'activityCategory' | 'promotion' | 'preference';

type Props = {
  label: string;
  variant: Variant;
  onPress?: () => void;
};

export default function ChipBadge({ label, variant, onPress }: Props) {
  const content = (
    <View style={[styles.container, styles[variant]]}>
      <Typography size="xs" style={textStyles[variant]}>
        {label}
      </Typography>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityCategory: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 200,
    backgroundColor: '#F5F5F5',
  },
  promotion: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 200,
    backgroundColor: colors.text.secondary,
  },
  preference: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: colors.primary.sub,
    borderWidth: 1,
    borderColor: colors.primary.sub,
  },
});

const textStyles = StyleSheet.create({
  activityCategory: {
    color: colors.text.secondary,
    textAlign: 'center',
  },
  promotion: {
    color: colors.border.default,
    textAlign: 'center',
  },
  preference: {
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
