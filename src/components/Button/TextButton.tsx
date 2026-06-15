import { TouchableOpacity } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  label: string;
  onPress: () => void;
};

export default function TextButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={8}>
      <Typography size="sm" weight="medium" style={{ textDecorationLine: 'underline' }}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
}
