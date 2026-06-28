import { api } from '@/src/lib/api';
import type { HomeData, DetailActivity, CategoryPageData } from '@/src/types/activities';

export async function getHomeData(): Promise<HomeData> {
  const { data } = await api.get('/pages/home');
  return data.data;
}

export async function getDetailData(activityId: number): Promise<DetailActivity> {
  const { data } = await api.get(`/pages/detail/${activityId}`);
  return data.data;
}

export async function getCategoryPageData(params: {
  type?: string;
  category?: string;
  sort?: string;
}): Promise<CategoryPageData> {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ''),
  );
  const { data } = await api.get('/pages/category', { params: filtered });
  return data.data;
}
