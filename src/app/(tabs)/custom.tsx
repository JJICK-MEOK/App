import { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import CardStack from '@/src/components/Card/CardStack';
import { getPersonalizationActivities } from '@/src/api/activities';
import { getCustomPageData } from '@/src/api/pages';
import { getTagVariant } from '@/src/utils/tagVariant';
import { colors } from '@/src/constants/colors';
import type { Activity } from '@/src/types/activities';
import type { PersonalizationActivity } from '@/src/types/activities';

function pickRandomTags(tags: string[], count: number): string[] {
  const shuffled = [...tags].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getDaysLeft(recruitEndAt: string): number {
  return Math.ceil((new Date(recruitEndAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function toActivity(item: PersonalizationActivity): Activity {
  const daysLeft = getDaysLeft(item.recruitEndAt);
  return {
    id: String(item.id),
    title: item.title,
    days: Math.max(0, daysLeft),
    tags: pickRandomTags(item.tags ?? [], 3).map((tag, i) => {
      const label = tag.startsWith('#') ? tag.slice(1) : tag;
      return { label, type: getTagVariant(label, i) };
    }),
    imageUrl: item.thumbnailUrl,
    favoriteId: item.activityFavoriteId ?? undefined,
    matchRate: item.matchRate,
  };
}

export default function CustomScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: pageData } = useQuery({
    queryKey: ['pages', 'custom'],
    queryFn: () => getCustomPageData(),
  });

  const { data: rawActivities, isLoading } = useQuery({
    queryKey: ['personalization-activities'],
    queryFn: getPersonalizationActivities,
  });

  const activities = useMemo<Activity[]>(
    () =>
      (rawActivities ?? []).filter((item) => getDaysLeft(item.recruitEndAt) >= 0).map(toActivity),
    [rawActivities],
  );
  const nickname = pageData?.nickname ?? '';

  const handlePressCard = (activity: Activity) => {
    router.push(`/detail/${activity.id}`);
  };

  return (
    <ScreenLayout style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <Text style={styles.barText}>
          {nickname ? `${nickname}님 취향에 맞춰 골라봤어요!` : ' '}
        </Text>
      </View>

      <View style={styles.cardArea}>
        {isLoading ? (
          <ActivityIndicator color="#999" />
        ) : (
          <CardStack activities={activities} onPressCard={handlePressCard} />
        )}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
  },
  bar: {
    height: 60,
    paddingHorizontal: 22,
    paddingVertical: 17,
    justifyContent: 'center',
  },
  barText: {
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    fontSize: 22,
    color: colors.text.primary,
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 52,
  },
});
