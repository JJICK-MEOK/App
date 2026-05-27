import { create } from 'zustand';

interface OnboardingState {
  nickname: string;
  topicTagIds: number[];
  regionIds: number[];
  preferenceTagIds: number[];
  setNickname: (nickname: string) => void;
  setTopicTagIds: (ids: number[]) => void;
  setRegionIds: (ids: number[]) => void;
  setPreferenceTagIds: (ids: number[]) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  nickname: '',
  topicTagIds: [],
  regionIds: [],
  preferenceTagIds: [],
  setNickname: (nickname) => set({ nickname }),
  setTopicTagIds: (ids) => set({ topicTagIds: ids }),
  setRegionIds: (ids) => set({ regionIds: ids }),
  setPreferenceTagIds: (ids) => set({ preferenceTagIds: ids }),
}));
