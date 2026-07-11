import { api } from '@/src/lib/api';
import type {
  HomeData,
  HomeSection,
  DetailActivity,
  CategoryPageData,
  CustomPageData,
  CurationDetailPageData,
} from '@/src/types/activities';

export async function getHomeData(limit = 10): Promise<HomeData> {
  const { data } = await api.get('/pages/home', { params: { limit } });
  return data.data;
}

export async function getCurationDetailPageData(
  curationKey: string,
): Promise<CurationDetailPageData> {
  const { data } = await api.get(`/pages/home/curations/${curationKey}`);
  return data.data;
}

export async function getFavoritesPageData(): Promise<HomeSection> {
  const { data } = await api.get('/pages/favorites');
  return data.data;
}

export async function getDetailData(activityId: number): Promise<DetailActivity> {
  const { data } = await api.get(`/pages/detail/${activityId}`);
  return data.data;
}

export async function getCustomPageData(limit = 3): Promise<CustomPageData> {
  const { data } = await api.get('/pages/custom', { params: { limit } });
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
