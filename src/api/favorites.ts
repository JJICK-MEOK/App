import { api } from '@/src/lib/api';
import type { ActivityFavoriteResponse } from '@/src/types/activities';

export async function addFavorite(activityId: number): Promise<ActivityFavoriteResponse> {
  const { data } = await api.post('/activity-favorites', { activityId });
  return data.data;
}

export async function deleteFavorite(activityId: number): Promise<void> {
  await api.delete(`/activity-favorites/${activityId}`);
}
