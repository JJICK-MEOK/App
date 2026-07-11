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

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

// 시드 기반 의사난수: 같은 입력이면 항상 같은 순서로 섞인다(리렌더링 시 태그가 바뀌지 않음).
function seededShuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let s = seed || 1;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 백엔드가 태그를 카테고리 우선순위(MOOD→INTENSITY→PURPOSE→DURATION→SIZE)대로 정렬해서 내려주기 때문에,
// "앞에서부터 서로 다른 카테고리 N개"를 고르면 항상 앞쪽 카테고리(MOOD, INTENSITY)로 수렴해버린다.
// 그래서 카테고리별 대표 태그를 먼저 뽑은 뒤, 태그 내용 기반 시드로 섞어서 고른다(활동마다 다른 조합이 나오되, 같은 활동은 항상 같은 조합).
export function pickDiverseTags<T extends string>(labels: T[], count = 2): T[] {
  const byVariant = new Map<TagVariant, T>();
  for (const label of labels) {
    const variant = getTagVariant(label);
    if (!byVariant.has(variant)) byVariant.set(variant, label);
  }
  const candidates = Array.from(byVariant.values());
  if (candidates.length <= count) {
    const picked = [...candidates];
    for (const label of labels) {
      if (picked.includes(label)) continue;
      picked.push(label);
      if (picked.length >= count) break;
    }
    return picked.slice(0, count);
  }
  const seed = hashString(labels.join('|'));
  return seededShuffle(candidates, seed).slice(0, count);
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
