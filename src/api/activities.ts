import { api } from '@/src/lib/api';
import type { Activity, ActivitySummary, PersonalizationActivity } from '@/src/types/activities';

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
    params: { cursor },
  });
  return data.data;
}

export async function searchActivities(keyword: string): Promise<ActivitySummary[]> {
  const { data } = await api.get('/activities', { params: { keyword } });
  return data.data;
}

export async function getPersonalizationActivities(): Promise<PersonalizationActivity[]> {
  const { data } = await api.get('/personalization/users/me/personlization-activities');
  return data.data;
}
