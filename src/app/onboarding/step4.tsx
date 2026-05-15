import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CategoryCard } from '@/src/components/Card/CategoryCard';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Topic = {
  id: number;
  name: string;
  subscribers: string;
};

const TOPICS: Topic[] = [
  { id: 1, name: '운동 / 액티비티', subscribers: '00,000' },
  { id: 2, name: '문화 / 공연 / 축제', subscribers: '00,000' },
  { id: 3, name: '공예 / 만들기', subscribers: '00,000' },
  { id: 4, name: '댄스 / 무용', subscribers: '00,000' },
  { id: 5, name: '요리 / 베이킹', subscribers: '00,000' },
  { id: 6, name: '사진 / 영상', subscribers: '00,000' },
  { id: 7, name: '음악 / 악기', subscribers: '00,000' },
  { id: 8, name: '인문학 / 책 / 글', subscribers: '00,000' },
  { id: 9, name: '여행 / 산책 / 탐방', subscribers: '00,000' },
  { id: 10, name: '해외 / 외국어', subscribers: '00,000' },
  { id: 11, name: '봉사활동', subscribers: '00,000' },
  { id: 12, name: '자기계발 / 클래스', subscribers: '00,000' },
  { id: 13, name: '커리어 / 실무', subscribers: '00,000' },
  { id: 14, name: '기타', subscribers: '00,000' },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<Set<number>>(new Set());

  const toggleTopic = (id: number) => {
    setSelectedTopics((prev) => {
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

        <View style={styles.cardList}>
          {TOPICS.map((topic) => (
            <CategoryCard
              key={topic.id}
              categoryName={topic.name}
              subscriberText={`${topic.subscribers}명이 구독했어요`}
              imageUri=""
              subscribed={selectedTopics.has(topic.id)}
              onSubscribePress={() => toggleTopic(topic.id)}
            />
          ))}
        </View>
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => router.push('/onboarding/step5')}
          variant="primary"
          disabled={selectedTopics.size === 0}
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
    gap: 24,
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
