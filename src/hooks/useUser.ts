import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/user';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: false, // 백엔드 없어서 실행 막기
  });
};
