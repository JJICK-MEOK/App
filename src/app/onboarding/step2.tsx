import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CategoryCard } from '@/src/components/Card/CategoryCard';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { getTags } from '@/src/api/user';
import { useOnboardingStore } from '@/src/store/onboardingStore';
import { useNavigateOnce } from '@/src/hooks/useNavigateOnce';
import { useState } from 'react';
import BookSvg from '@/assets/images/book.svg';
import ArtSvg from '@/assets/images/art.svg';
import PhotoSvg from '@/assets/images/photo.svg';
import LanguageSvg from '@/assets/images/language.svg';
import TravelSvg from '@/assets/images/travel.svg';
import MakeSvg from '@/assets/images/make.svg';
import CareerSvg from '@/assets/images/career.svg';
import CookSvg from '@/assets/images/cook.svg';
import SportSvg from '@/assets/images/sport.svg';
import VolunteerSvg from '@/assets/images/volunteer.svg';
import DefaultActivitySvg from '@/assets/images/DefaultActivity.svg';

type SvgComponent = React.ComponentType<{ width?: number | string; height?: number | string }>;

const CATEGORY_IMAGE_MAP: Record<string, SvgComponent> = {
  '책/글': BookSvg,
  '문화/예술': ArtSvg,
  '사진/영상': PhotoSvg,
  '언어/해외': LanguageSvg,
  '여행/탐방': TravelSvg,
  '공예/만들기': MakeSvg,
  '성장/커리어': CareerSvg,
  '요리/베이킹': CookSvg,
  '운동/액티비티': SportSvg,
  봉사활동: VolunteerSvg,
};

function getCategoryImage(name: string): SvgComponent {
  const normalized = name.replace(/\s*\/\s*/g, '/');
  return CATEGORY_IMAGE_MAP[normalized] ?? DefaultActivitySvg;
}

export default function OnboardingStep2() {
  const router = useRouter();
  const navigateOnce = useNavigateOnce();
  const { setTopicTagIds, topicTagIds } = useOnboardingStore();
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<number>>(new Set(topicTagIds));

  const {
    data: topics = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['tags', 'TOPIC_CATEGORY'],
    queryFn: () => getTags('TOPIC_CATEGORY'),
  });

  const toggleTopic = (id: number) => {
    setSelectedTopicIds((prev) => {
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
        <ProgressBar step={1} />
      </View>
      <ArrowLeftBar onPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Typography size="xxxl" weight="semiBold" style={styles.title}>
            {'관심있는 주제를\n모두 선택해주세요!'}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            최대 5개까지 선택할 수 있어요.
          </Typography>
        </View>

        {isLoading ? (
          <ActivityIndicator color={colors.text.secondary} />
        ) : isError ? (
          <View style={styles.errorContainer}>
            <Typography size="md" style={styles.errorText}>
              데이터를 불러오지 못했어요.
            </Typography>
            <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
              <Typography size="md" weight="semiBold">
                다시 시도
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardList}>
            {topics.map((topic) => (
              <CategoryCard
                key={topic.id}
                categoryName={topic.name}
                ImageComponent={getCategoryImage(topic.name)}
                subscribed={selectedTopicIds.has(topic.id)}
                onSubscribePress={() => toggleTopic(topic.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => {
            setTopicTagIds(Array.from(selectedTopicIds));
            navigateOnce('/onboarding/step3');
          }}
          variant="dark"
          disabled={selectedTopicIds.size === 0}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'flex-start',
    gap: 44,
  },
  headerBlock: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  title: {
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  cardList: {
    width: '100%',
    flexDirection: 'column',
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, paddingTop: 9, paddingBottom: 7 },
  errorContainer: { alignItems: 'center', gap: 12, paddingTop: 20 },
  errorText: { color: colors.text.secondary },
  retryButton: { paddingHorizontal: 20, paddingVertical: 8 },
});
