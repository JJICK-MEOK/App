import { api } from '@/src/lib/api';
import type { ActivitySummary, PersonalizationActivity } from '@/src/types/activities';

export async function searchActivities(keyword: string): Promise<ActivitySummary[]> {
  const { data } = await api.get('/activities', { params: { keyword } });
  return data.data;
}

export async function getPersonalizationActivities(): Promise<PersonalizationActivity[]> {
  const { data } = await api.get('/personalization/users/me/personalization-activities');
  return data.data;
}
