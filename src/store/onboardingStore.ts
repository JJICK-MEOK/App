import { create } from 'zustand';

interface OnboardingState {
  topicTagIds: number[];
  regionIds: number[];
  preferenceTagIds: number[];
  setTopicTagIds: (ids: number[]) => void;
  setRegionIds: (ids: number[]) => void;
  setPreferenceTagIds: (ids: number[]) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  topicTagIds: [],
  regionIds: [],
  preferenceTagIds: [],
  setTopicTagIds: (ids) => set({ topicTagIds: ids }),
  setRegionIds: (ids) => set({ regionIds: ids }),
  setPreferenceTagIds: (ids) => set({ preferenceTagIds: ids }),
}));
