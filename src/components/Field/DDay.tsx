import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Props = {
  // 백엔드 연결 시: targetDate로 days를 계산해서 <DDay days={계산값} />으로 넘길 것
  days: number;
};

const formatDDay = (days: number): string => {
  if (days === 0) return 'D-Day';
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
};

export default function DDay({ days }: Props) {
  return (
    <Typography size="sm" weight="bold" style={{ color: colors.primary.sub }}>
      {formatDDay(days)}
    </Typography>
  );
}
