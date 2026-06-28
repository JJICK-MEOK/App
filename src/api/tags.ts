import { api } from '@/src/lib/api';

export type TagType = 'TOPIC_CATEGORY' | 'PREFERENCE_TAG' | 'ACTIVITY_CATEGORY';

export interface Tag {
  id: number;
  name: string;
  type: TagType;
}

export async function getTags(type: TagType): Promise<Tag[]> {
  const { data } = await api.get('/tags', { params: { type } });
  return data.data;
}
