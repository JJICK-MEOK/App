import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import ChipChoice from '@/src/components/Chip/ChipChoice';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { getTags, TagItem } from '@/src/api/user';
import { useOnboardingStore } from '@/src/store/onboardingStore';

const ROW_SIZES = [4, 3, 4, 3, 4, 2];

function groupIntoRows(tags: TagItem[]): TagItem[][] {
  const rows: TagItem[][] = [];
  let idx = 0;
  for (let i = 0; idx < tags.length; i++) {
    const size = ROW_SIZES[i % ROW_SIZES.length];
    rows.push(tags.slice(idx, idx + size));
    idx += size;
  }
  return rows;
}

export default function OnboardingStep6() {
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

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar step={3} />
      </View>
      <ArrowLeftBar onPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Typography size="xxxl" weight="bold">
            {'어떤 분위기의\n활동이 끌리나요?'}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            최대 5개까지 선택해주세요.
          </Typography>
        </View>

        {isLoading ? (
          <ActivityIndicator color={colors.text.secondary} />
        ) : (
          <View style={styles.chipContainer}>
            {groupIntoRows(tags).map((row, rowIdx) => (
              <View key={rowIdx} style={styles.tagRow}>
                {row.map((tag) => (
                  <ChipChoice
                    key={tag.id}
                    label={`#${tag.name}`}
                    selected={selectedTagIds.has(tag.id)}
                    onPress={() => toggleTag(tag.id)}
                  />
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => {
            setPreferenceTagIds(Array.from(selectedTagIds));
            router.push('/onboarding/step7');
          }}
          variant="primary"
          disabled={selectedTagIds.size === 0}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 63,
    gap: 72,
  },
  headerBlock: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 13,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  chipContainer: {
    gap: 19,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, marginBottom: 9 },
});
