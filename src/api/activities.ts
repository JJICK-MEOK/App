import { api } from '@/src/lib/api';
import type {
  ActivitySummary,
  PersonalizationActivity,
  PersonalizationBestType,
} from '@/src/types/activities';

export async function getRecommendations(): Promise<ActivitySummary[]> {
  const { data } = await api.get('/activities/recommendations');
  return data.data;
}

export async function searchActivities(keyword: string): Promise<ActivitySummary[]> {
  const { data } = await api.get('/activities', { params: { keyword } });
  return data.data;
}

export async function getPersonalizationActivities(): Promise<PersonalizationActivity[]> {
  const { data } = await api.get('/personalization/users/me/personalization-activities');
  return data.data;
}

export async function getBestType(): Promise<PersonalizationBestType> {
  const { data } = await api.get('/personalization/users/me/best-type');
  return data.data;
}
