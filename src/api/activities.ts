import { api } from '@/src/lib/api';
import type { Activity } from '@/src/components/Card/SwipeCard';

interface RecommendationsResponse {
  items: Activity[];
  nextCursor?: string;
}

export async function getRecommendations({
  cursor,
}: {
  cursor?: string;
}): Promise<RecommendationsResponse> {
  const { data } = await api.get('/activities/recommendations', {
    params: cursor ? { cursor } : {},
  });
  return data.data;
}
