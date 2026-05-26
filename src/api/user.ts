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
  return data.data;
};

export type TagType = 'TOPIC_CATEGORY' | 'PREFERENCE_TAG' | 'ACTIVITY_CATEGORY';

export interface TagItem {
  id: number;
  name: string;
  type: TagType;
}

export const getTags = async (type?: TagType): Promise<TagItem[]> => {
  const { data } = await api.get('/tags', { params: type ? { type } : {} });
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
