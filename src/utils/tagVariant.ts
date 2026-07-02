import type { TagVariant } from '@/src/components/Chip/ChipBadge';

const TAG_VARIANT_MAP: Record<string, TagVariant> = {
  // mood (핑크) - 활동 분위기
  편안한: 'mood',
  힐링: 'mood',
  활기찬: 'mood',
  감성적: 'mood',
  창의적: 'mood',
  트렌디: 'mood',
  // intensity (보라) - 활동 강도
  입문: 'intensity',
  가볍게: 'intensity',
  몰입: 'intensity',
  도전: 'intensity',
  // purpose (주황) - 활동 목적
  휴식: 'purpose',
  취미: 'purpose',
  배움: 'purpose',
  성장: 'purpose',
  // duration (초록) - 활동 기간
  단기: 'duration',
  한달: 'duration',
  '6개월': 'duration',
  '1년이상': 'duration',
  // groupSize (파랑) - 활동 규모
  소규모: 'groupSize',
  대규모: 'groupSize',
};

const FALLBACK_VARIANTS: TagVariant[] = ['mood', 'intensity', 'duration', 'groupSize', 'purpose'];

export function getTagVariant(hashtag: string, fallbackIndex: number = 0): TagVariant {
  const key = hashtag.startsWith('#') ? hashtag.slice(1) : hashtag;
  return TAG_VARIANT_MAP[key] ?? FALLBACK_VARIANTS[fallbackIndex % FALLBACK_VARIANTS.length];
}
