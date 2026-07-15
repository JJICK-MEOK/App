import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';
import CurationSoloCulture from '@/assets/images/Curation/CurationSoloCulture.svg';
import CurationNewInspiration from '@/assets/images/Curation/CurationNewInspiration.svg';
import CurationWeekendFun from '@/assets/images/Curation/CurationWeekendFun.svg';
import CurationHealing from '@/assets/images/Curation/CurationHealing.svg';
import CurationZeroCost from '@/assets/images/Curation/CurationZeroCost.svg';
import CurationFocusTime from '@/assets/images/Curation/CurationFocusTime.svg';
import CurationGrowAsYouLearn from '@/assets/images/Curation/CurationGrowAsYouLearn.svg';
import CurationLongTermHobby from '@/assets/images/Curation/CurationLongTermHobby.svg';
import CurationActiveChange from '@/assets/images/Curation/CurationActiveChange.svg';
import CurationMeaningfulDay from '@/assets/images/Curation/CurationMeaningfulDay.svg';

export const CURATION_KEY_BY_TITLE: Record<string, string> = {
  '혼자 즐기는 문화생활': 'SOLO_CULTURE',
  '새로운 영감이 필요할 때': 'NEW_INSPIRATION',
  '이번 주말 뭐하지?': 'WEEKEND_FUN',
  '쉬어가고 싶은 날엔': 'HEALING',
  '0원으로 취미 입문': 'ZERO_COST',
  '조용히 몰입하는 시간': 'FOCUS_TIME',
  '배우면서 성장하기': 'GROW_AS_YOU_LEARN',
  '오래 좋아할 무언가를 찾는다면': 'LONG_TERM_HOBBY',
  '움직이면 기분이 달라질지도': 'ACTIVE_CHANGE',
  '의미 있는 하루를 보내고 싶다면': 'MEANINGFUL_DAY',
};

export const CURATION_IMAGE_BY_KEY: Record<string, ComponentType<SvgProps>> = {
  SOLO_CULTURE: CurationSoloCulture,
  NEW_INSPIRATION: CurationNewInspiration,
  WEEKEND_FUN: CurationWeekendFun,
  HEALING: CurationHealing,
  ZERO_COST: CurationZeroCost,
  FOCUS_TIME: CurationFocusTime,
  GROW_AS_YOU_LEARN: CurationGrowAsYouLearn,
  LONG_TERM_HOBBY: CurationLongTermHobby,
  ACTIVE_CHANGE: CurationActiveChange,
  MEANINGFUL_DAY: CurationMeaningfulDay,
};
