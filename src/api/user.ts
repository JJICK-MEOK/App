import { api } from '@/src/lib/api';

type Gender = 'MALE' | 'FEMALE' | 'NONE';
type Status = 'STUDENT' | 'WORKER' | 'JOB_SEEKER' | 'FREELANCER' | 'ETC';

export interface RegionItem {
  id: number;
  parentId?: number;
  name: string;
  depth: 'PROVINCE' | 'DISTRICT';
}

export const getRegions = async (parentId?: number): Promise<RegionItem[]> => {
  const { data } = await api.get('/regions', { params: parentId ? { parentId } : {} });
  return [...data.data].sort((a: RegionItem, b: RegionItem) => a.id - b.id);
};

export type TagType = 'TOPIC_CATEGORY' | 'PREFERENCE_TAG' | 'ACTIVITY_CATEGORY';
export type TagGroupType = 'MOOD' | 'INTENSITY' | 'PURPOSE' | 'DURATION' | 'SIZE';

export interface TagItem {
  id: number;
  name: string;
  type: TagType;
  tagGroupType: TagGroupType | null;
}

export const getTags = async (type?: TagType): Promise<TagItem[]> => {
  const { data } = await api.get('/tags', { params: type ? { tagType: type } : {} });
  const result: TagItem[] = data.data;
  return [...result].sort((a, b) => a.id - b.id);
};

export interface UserProfileMeTag {
  id: number;
  name: string;
  type: TagType;
  groupType: TagGroupType | null;
}

export interface UserProfileMe {
  nickname: string;
  // 생성 API로만 만든 계정(OAuth 미연동)은 항상 빈 문자열
  profileImageUrl: string;
  // 온보딩 때 선택한 태그 기준, 백엔드에서 최대 5개까지만 반환 (MY_PROFILE_TAG_LIMIT)
  tags: UserProfileMeTag[];
}

export const getMyProfile = async (): Promise<UserProfileMe> => {
  const { data } = await api.get('/users/me/profile');
  return data.data;
};

interface OnboardingRequest {
  topicTagIds: number[];
  regionIds: number[];
  preferenceTagIds: number[];
}

interface OnboardingResponse {
  userId: number;
  onboardingId: number;
  completed: boolean;
  topicTagIds: number[];
  regionIds: number[];
  preferenceTagIds: number[];
}

export const postOnboarding = async (body: OnboardingRequest): Promise<OnboardingResponse> => {
  const { data } = await api.post('/users/me/onboarding', body);
  return data.data;
};

interface CreateProfileRequest {
  nickname: string;
  birthDate: string;
  gender: Gender;
  status: Status;
  serviceTermsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  marketingAgreed: boolean;
}

interface CreateProfileResponse {
  registrationStatus: 'NOT_STARTED' | 'PROFILE_COMPLETED' | 'ONBOARDING_COMPLETED';
}

export const postCreateProfile = async (
  body: CreateProfileRequest,
): Promise<CreateProfileResponse> => {
  const { data } = await api.post('/users/me/profile', body);
  return data.data;
};
