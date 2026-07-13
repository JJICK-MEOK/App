import { StyleSheet, View } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import ModalButton from '@/src/components/Button/ModalButton';
import { colors } from '@/src/constants/colors';
import { radius, spacing } from '@/src/constants/spacing';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ onCancel, onConfirm }: Props) {
  return (
    <View style={styles.container}>
      <Typography size="xl" weight="semiBold" style={styles.title}>
        로그아웃 하시겠습니까?
      </Typography>
      <View style={styles.buttonRow}>
        <ModalButton label="아니요" variant="secondary" onPress={onCancel} />
        <ModalButton label="네" variant="primary" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    alignItems: 'center',
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl + spacing.sm,
  },
  title: {
    marginBottom: spacing.xxxl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
