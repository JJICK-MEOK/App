import type { TagVariant } from '@/src/components/Chip/ChipBadge';

const TAG_VARIANT_MAP: Record<string, TagVariant> = {
  편안한: 'MOOD',
  힐링: 'MOOD',
  활기찬: 'MOOD',
  감성적: 'MOOD',
  창의적: 'MOOD',
  트렌디: 'MOOD',
  입문: 'INTENSITY',
  가볍게: 'INTENSITY',
  몰입: 'INTENSITY',
  도전: 'INTENSITY',
  휴식: 'PURPOSE',
  취미: 'PURPOSE',
  배움: 'PURPOSE',
  성장: 'PURPOSE',
  단기: 'DURATION',
  한달: 'DURATION',
  '6개월': 'DURATION',
  '1년이상': 'DURATION',
  소규모: 'SIZE',
  대규모: 'SIZE',
};

const FALLBACK_VARIANTS: TagVariant[] = ['MOOD', 'INTENSITY', 'DURATION', 'SIZE', 'PURPOSE'];

export function getTagVariant(hashtag: string, fallbackIndex: number = 0): TagVariant {
  const key = hashtag.startsWith('#') ? hashtag.slice(1) : hashtag;
  return TAG_VARIANT_MAP[key] ?? FALLBACK_VARIANTS[fallbackIndex % FALLBACK_VARIANTS.length];
}

export const VARIANT_PRIORITY: TagVariant[] = ['MOOD', 'INTENSITY', 'PURPOSE', 'DURATION', 'SIZE'];

export function sortByVariantPriority<T extends { variant: TagVariant }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => VARIANT_PRIORITY.indexOf(a.variant) - VARIANT_PRIORITY.indexOf(b.variant),
  );
}

export function assignUniqueVariants<T extends string>(
  labels: T[],
): { label: T; variant: TagVariant }[] {
  const used = new Set<TagVariant>();
  const assigned = labels.map((label, i) => {
    let variant = getTagVariant(label, i);
    if (used.has(variant)) {
      variant = VARIANT_PRIORITY.find((v) => !used.has(v)) ?? variant;
    }
    used.add(variant);
    return { label, variant };
  });
  return sortByVariantPriority(assigned);
}
