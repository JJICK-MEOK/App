import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecommendations } from '@/src/api/activities';
import type { Activity } from '@/src/types/activities';

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: '[영등포문화재단] 도림생활문화센터\n2026 사계절클래스 [봄] 프로그램',
    days: 11,
    tags: [
      { label: '힐링', type: 'MOOD' },
      { label: '저강도', type: 'INTENSITY' },
      { label: '소그룹', type: 'SIZE' },
    ],
  },
  {
    id: '2',
    title: '[서대문구] 2026 봄 문화예술 프로그램',
    days: 5,
    tags: [
      { label: '창작', type: 'MOOD' },
      { label: '반나절', type: 'DURATION' },
    ],
  },
  {
    id: '3',
    title: '[마포구] 홍대앞 창작스튜디오 오픈클래스',
    days: 20,
    tags: [
      { label: '고강도', type: 'INTENSITY' },
      { label: '자기계발', type: 'PURPOSE' },
    ],
  },
  {
    id: '4',
    title: '[종로구] 인사동 전통문화체험 프로그램',
    days: 3,
    tags: [
      { label: '힐링', type: 'MOOD' },
      { label: '대그룹', type: 'SIZE' },
    ],
  },
  {
    id: '5',
    title: '[성동구] 성수동 아트마켓 참여 프로그램',
    days: 15,
    tags: [
      { label: '하루종일', type: 'DURATION' },
      { label: '네트워킹', type: 'PURPOSE' },
    ],
  },
];

const MOCK_PAGE = { items: MOCK_ACTIVITIES, nextCursor: undefined };

export function useActivities() {
  const query = useInfiniteQuery({
    queryKey: ['activities', 'recommendations'],
    queryFn: ({ pageParam }) => getRecommendations({ cursor: pageParam as string | undefined }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    initialData: { pages: [MOCK_PAGE], pageParams: [undefined] },
  });

  const activities: Activity[] = query.data?.pages.flatMap((p) => p.items) ?? [];

  return {
    activities,
    fetchMore: query.fetchNextPage,
    hasMore: query.hasNextPage ?? false,
    isLoading: query.isLoading,
  };
}
