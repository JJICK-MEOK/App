import { useState } from 'react';

/**
 * useInfiniteScroll Hook
 *
 * 기능
 * - 리스트 끝에 도달하면 fetchMore 호출
 * - 중복 호출 방지 (`isFetching` 체크)
 * - `fetchMore` 실패 시에도 `isFetching` 상태를 항상 초기화
 *
 * @example
 * const { handleEndReached, isFetching } = useInfiniteScroll({
 *   fetchMore: loadNextPage,
 *   hasNextPage: true,
 * });
 *
 * // 리스트 끝에 도달했을 때 호출
 * handleEndReached();
 *
 * @param fetchMore - 다음 데이터를 가져오는 비동기 함수
 * @param hasNextPage - 다음 페이지 존재 여부
 *
 */
export const useInfiniteScroll = ({ fetchMore, hasNextPage }: any) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleEndReached = async () => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    try {
      await fetchMore();
    } finally {
      setIsFetching(false);
    }
  };

  return { handleEndReached, isFetching };
};
