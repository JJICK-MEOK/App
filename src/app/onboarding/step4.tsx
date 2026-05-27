import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
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
import { useState } from 'react';

export default function OnboardingStep4() {
  const router = useRouter();
  const { setTopicTagIds } = useOnboardingStore();
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<number>>(new Set());

  const {
    data: topics = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tags', 'TOPIC_CATEGORY'],
    queryFn: () => getTags('TOPIC_CATEGORY'),
  });

  if (error) console.error('태그 조회 실패', error);
  console.log('관심 주제 태그:', topics);

  const toggleTopic = (id: number) => {
    setSelectedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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
          <Typography size="xxxl" weight="bold" style={styles.title}>
            {'관심있는 주제를\n모두 선택해주세요!'}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            내게 꼭 맞는 활동을 추천해드릴게요.
          </Typography>
        </View>

        {isLoading ? (
          <ActivityIndicator color={colors.text.secondary} />
        ) : (
          <View style={styles.cardList}>
            {topics.map((topic) => (
              <CategoryCard
                key={topic.id}
                categoryName={topic.name}
                subscriberText="00,000명이 구독했어요"
                imageUri={`https://picsum.photos/seed/${topic.id}/70/70`}
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
            router.push('/onboarding/step5');
          }}
          variant="primary"
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
    gap: 72,
  },
  headerBlock: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 13,
    paddingLeft: 10,
  },
  title: {
    color: colors.text.primary,
    lineHeight: 32,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  cardList: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, marginBottom: 9 },
});
