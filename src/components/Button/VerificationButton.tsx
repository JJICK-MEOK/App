import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

export type VerificationStatus = 'disabled' | 'enabled' | 'resend';

type Props = {
  status: VerificationStatus;
  onPress: () => void;
};

const LABEL: Record<VerificationStatus, string> = {
  disabled: '인증하기',
  enabled: '인증하기',
  resend: '재요청',
};

export default function VerificationButton({ status, onPress }: Props) {
  const isActive = status === 'enabled' || status === 'resend';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={status === 'disabled'}
      style={[styles.container, isActive ? styles.active : styles.inactive]}
    >
      <Typography
        size="sm"
        weight="medium"
        style={{ color: isActive ? colors.neutral.white : colors.text.tertiary }}
      >
        {LABEL[status]}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    backgroundColor: colors.border.light,
  },
  active: {
    backgroundColor: colors.text.primary,
  },
});
