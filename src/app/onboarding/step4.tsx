import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { getTags } from '@/src/api/user';
import { useOnboardingStore } from '@/src/store/onboardingStore';

const CATEGORIES = [
  { label: '선호하는 분위기', names: ['편안한', '힐링', '활기찬', '감성적', '창의적', '트렌디'] },
  { label: '나에게 맞는 텐션', names: ['입문', '가볍게', '몰입', '도전'] },
  { label: '가능한 참여 기간', names: ['단기', '한달', '6개월', '1년이상'] },
  { label: '편하게 느끼는 인원', names: ['소규모', '대규모'] },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const [selectedTagIds, setSelectedTagIds] = useState<Set<number>>(new Set());
  const { setPreferenceTagIds } = useOnboardingStore();

  const {
    data: tags = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tags', 'PREFERENCE_TAG'],
    queryFn: () => getTags('PREFERENCE_TAG'),
  });

  if (error) console.error('취향 태그 조회 실패', error);

  const toggleTag = (id: number) => {
    setSelectedTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 5) {
        next.add(id);
      }
      return next;
    });
  };

  const tagsByName = useMemo(() => {
    const map: Record<string, (typeof tags)[0]> = {};
    tags.forEach((t) => (map[t.name] = t));
    return map;
  }, [tags]);

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar step={3} />
      </View>
      <ArrowLeftBar onPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Typography size="xxxl" weight="semiBold">
            {'어떤 유형의\n활동이 끌리나요?'}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            최대 5개까지 선택해주세요.
          </Typography>
        </View>

        {isLoading ? (
          <ActivityIndicator color={colors.text.secondary} />
        ) : (
          <View style={styles.sectionsContainer}>
            {CATEGORIES.map((category) => {
              const categoryTags = category.names
                .map((name) => tagsByName[name])
                .filter(Boolean);
              if (categoryTags.length === 0) return null;
              return (
                <View key={category.label} style={styles.section}>
                  <Typography size="md" weight="medium" style={styles.sectionLabel}>
                    {category.label}
                  </Typography>
                  <View style={styles.chipsRow}>
                    {categoryTags.map((tag) => {
                      const isSelected = selectedTagIds.has(tag.id);
                      return (
                        <TouchableOpacity
                          key={tag.id}
                          activeOpacity={0.7}
                          style={[styles.chip, isSelected && styles.chipSelected]}
                          onPress={() => toggleTag(tag.id)}
                        >
                          <Typography
                            size="lg"
                            weight="medium"
                            style={isSelected ? styles.chipTextSelected : styles.chipText}
                          >
                            #{tag.name}
                          </Typography>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => {
            setPreferenceTagIds(Array.from(selectedTagIds));
            router.push('/onboarding/step5');
          }}
          variant="dark"
          disabled={selectedTagIds.size === 0}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  progressContainer: { paddingHorizontal: 20, paddingTop: 9, paddingBottom: 7 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 99,
    gap: 40,
  },
  headerBlock: {
    gap: 10,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  sectionsContainer: {
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionLabel: {
    color: colors.text.secondary,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: colors.neutral.surface,
  },
  chipSelected: {
    backgroundColor: colors.primary.main,
  },
  chipText: {
    color: colors.text.tertiary,
  },
  chipTextSelected: {
    color: colors.text.primary,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
});
