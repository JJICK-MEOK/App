import { api } from '@/src/lib/api';
import type { Activity } from '@/src/types/activities';

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
