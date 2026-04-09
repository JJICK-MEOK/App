import { useState } from 'react';

/**
 * Infinite Scroll Hook
 *
 * 기능:
 * - 리스트 끝 도달 시 fetch 실행
 * - 중복 호출 방지
 *
 * @example
 * const { handleEndReached } = useInfiniteScroll(...)
 */
export const useInfiniteScroll = ({ fetchMore, hasNextPage }: any) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleEndReached = async () => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    await fetchMore();
    setIsFetching(false);
  };

  return { handleEndReached, isFetching };
};
