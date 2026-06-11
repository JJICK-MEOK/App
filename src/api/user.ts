import { api } from '@/src/lib/api';

type Gender = 'MALE' | 'FEMALE' | 'NONE';
type Status = 'STUDENT' | 'WORKER' | 'JOB_SEEKER' | 'FREELANCER' | 'ETC';

export interface RegionItem {
  id: number;
  parentId?: number;
  name: string;
  depth: 'PROVINCE' | 'DISTRICT';
}

const FALLBACK_PROVINCES: RegionItem[] = [
  { id: 26, name: '서울', depth: 'PROVINCE' },
  { id: 27, name: '경기', depth: 'PROVINCE' },
  { id: 28, name: '인천', depth: 'PROVINCE' },
  { id: 29, name: '강원', depth: 'PROVINCE' },
  { id: 30, name: '충북', depth: 'PROVINCE' },
  { id: 31, name: '충남', depth: 'PROVINCE' },
  { id: 32, name: '세종', depth: 'PROVINCE' },
  { id: 33, name: '대전', depth: 'PROVINCE' },
  { id: 34, name: '광주', depth: 'PROVINCE' },
  { id: 35, name: '전북', depth: 'PROVINCE' },
  { id: 36, name: '경북', depth: 'PROVINCE' },
  { id: 37, name: '대구', depth: 'PROVINCE' },
  { id: 38, name: '제주', depth: 'PROVINCE' },
  { id: 39, name: '전남', depth: 'PROVINCE' },
  { id: 40, name: '경남/울산', depth: 'PROVINCE' },
  { id: 41, name: '부산', depth: 'PROVINCE' },
];

const FALLBACK_SEOUL_DISTRICTS: RegionItem[] = [
  { id: 42, parentId: 26, name: '강남', depth: 'DISTRICT' },
  { id: 43, parentId: 26, name: '강동', depth: 'DISTRICT' },
  { id: 44, parentId: 26, name: '강북', depth: 'DISTRICT' },
  { id: 45, parentId: 26, name: '강서', depth: 'DISTRICT' },
  { id: 46, parentId: 26, name: '관악', depth: 'DISTRICT' },
  { id: 47, parentId: 26, name: '광진', depth: 'DISTRICT' },
  { id: 48, parentId: 26, name: '구로', depth: 'DISTRICT' },
  { id: 49, parentId: 26, name: '금천', depth: 'DISTRICT' },
  { id: 50, parentId: 26, name: '노원', depth: 'DISTRICT' },
  { id: 51, parentId: 26, name: '도봉', depth: 'DISTRICT' },
  { id: 52, parentId: 26, name: '동대문', depth: 'DISTRICT' },
  { id: 53, parentId: 26, name: '동작', depth: 'DISTRICT' },
  { id: 54, parentId: 26, name: '마포', depth: 'DISTRICT' },
  { id: 55, parentId: 26, name: '서대문', depth: 'DISTRICT' },
  { id: 56, parentId: 26, name: '서초', depth: 'DISTRICT' },
  { id: 57, parentId: 26, name: '성동', depth: 'DISTRICT' },
  { id: 58, parentId: 26, name: '성북', depth: 'DISTRICT' },
  { id: 59, parentId: 26, name: '송파', depth: 'DISTRICT' },
  { id: 60, parentId: 26, name: '양천', depth: 'DISTRICT' },
  { id: 61, parentId: 26, name: '영등포', depth: 'DISTRICT' },
  { id: 62, parentId: 26, name: '용산', depth: 'DISTRICT' },
  { id: 63, parentId: 26, name: '은평', depth: 'DISTRICT' },
  { id: 64, parentId: 26, name: '종로', depth: 'DISTRICT' },
  { id: 65, parentId: 26, name: '중구', depth: 'DISTRICT' },
  { id: 66, parentId: 26, name: '중랑', depth: 'DISTRICT' },
];

export const getRegions = async (parentId?: number): Promise<RegionItem[]> => {
  try {
    const { data } = await api.get('/regions', { params: parentId ? { parentId } : {} });
    const result: RegionItem[] = data.data;
    if (result?.length > 0) return result;
  } catch (error) {
    console.error('[getRegions] error:', error);
  }
  // TODO: API에 지역 데이터 seed 완료되면 아래 fallback 제거
  return parentId === 26 ? FALLBACK_SEOUL_DISTRICTS : FALLBACK_PROVINCES;
};

export type TagType = 'TOPIC_CATEGORY' | 'PREFERENCE_TAG' | 'ACTIVITY_CATEGORY';

export interface TagItem {
  id: number;
  name: string;
  type: TagType;
}

const FALLBACK_TAGS: TagItem[] = [
  { id: 1, name: '운동/액티비티', type: 'TOPIC_CATEGORY' },
  { id: 2, name: '문화/예술', type: 'TOPIC_CATEGORY' },
  { id: 3, name: '공예/만들기', type: 'TOPIC_CATEGORY' },
  { id: 4, name: '요리/베이킹', type: 'TOPIC_CATEGORY' },
  { id: 5, name: '사진/영상', type: 'TOPIC_CATEGORY' },
  { id: 6, name: '책/글', type: 'TOPIC_CATEGORY' },
  { id: 7, name: '여행/탐방', type: 'TOPIC_CATEGORY' },
  { id: 8, name: '언어/해외', type: 'TOPIC_CATEGORY' },
  { id: 9, name: '봉사활동', type: 'TOPIC_CATEGORY' },
  { id: 10, name: '성장/커리어', type: 'TOPIC_CATEGORY' },
  { id: 11, name: '프로그램', type: 'ACTIVITY_CATEGORY' },
  { id: 12, name: '원데이', type: 'ACTIVITY_CATEGORY' },
  { id: 13, name: '행사·강연', type: 'ACTIVITY_CATEGORY' },
  { id: 14, name: '동아리', type: 'ACTIVITY_CATEGORY' },
  { id: 15, name: '편안한', type: 'PREFERENCE_TAG' },
  { id: 16, name: '힐링', type: 'PREFERENCE_TAG' },
  { id: 17, name: '활기찬', type: 'PREFERENCE_TAG' },
  { id: 18, name: '감성적', type: 'PREFERENCE_TAG' },
  { id: 19, name: '창의적', type: 'PREFERENCE_TAG' },
  { id: 20, name: '트렌디', type: 'PREFERENCE_TAG' },
  { id: 21, name: '입문', type: 'PREFERENCE_TAG' },
  { id: 22, name: '가볍게', type: 'PREFERENCE_TAG' },
  { id: 23, name: '몰입', type: 'PREFERENCE_TAG' },
  { id: 24, name: '도전', type: 'PREFERENCE_TAG' },
  { id: 25, name: '휴식', type: 'PREFERENCE_TAG' },
  { id: 26, name: '취미', type: 'PREFERENCE_TAG' },
  { id: 27, name: '배움', type: 'PREFERENCE_TAG' },
  { id: 28, name: '성장', type: 'PREFERENCE_TAG' },
  { id: 29, name: '단기', type: 'PREFERENCE_TAG' },
  { id: 30, name: '한달', type: 'PREFERENCE_TAG' },
  { id: 31, name: '6개월', type: 'PREFERENCE_TAG' },
  { id: 32, name: '1년이상', type: 'PREFERENCE_TAG' },
  { id: 33, name: '소규모', type: 'PREFERENCE_TAG' },
  { id: 34, name: '대규모', type: 'PREFERENCE_TAG' },
];

export const getTags = async (type?: TagType): Promise<TagItem[]> => {
  try {
    const { data } = await api.get('/tags', { params: type ? { type } : {} });
    const result: TagItem[] = data.data;
    console.log('[getTags] API result:', result, 'type:', type);
    if (result?.length > 0) return result;
  } catch (error) {
    console.error('[getTags] error:', error);
  }
  const fallback = type ? FALLBACK_TAGS.filter((t) => t.type === type) : FALLBACK_TAGS;
  console.log('[getTags] returning fallback, count:', fallback.length);
  // TODO: API에 태그 데이터 seed 완료되면 아래 fallback 제거
  return fallback;
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
