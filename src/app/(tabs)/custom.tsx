import { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import CardStack from '@/src/components/Card/CardStack';
import { getPersonalizationActivities } from '@/src/api/activities';
import { getCustomPageData } from '@/src/api/pages';
import { getTagVariant } from '@/src/utils/tagVariant';
import type { Activity } from '@/src/types/activities';
import type { PersonalizationActivity } from '@/src/types/activities';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ELLIPSE_W = SCREEN_WIDTH * (614 / 375);
const ELLIPSE_H = SCREEN_WIDTH * (507 / 375);

function pickRandomTags(tags: string[], count: number): string[] {
  const shuffled = [...tags].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function toActivity(item: PersonalizationActivity): Activity {
  const daysLeft = Math.ceil(
    (new Date(item.recruitEndAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
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
    () => (rawActivities ?? []).map(toActivity),
    [rawActivities],
  );
  const nickname = pageData?.nickname ?? '';

  const handlePressCard = (activity: Activity) => {
    router.push(`/detail/${activity.id}`);
  };

  return (
    <ScreenLayout style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.bgEllipse} />

      <View style={styles.bar}>
        <Text style={styles.barText}>{nickname ? `${nickname} 님을 위해 준비했어요!` : ' '}</Text>
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
  bgEllipse: {
    position: 'absolute',
    width: ELLIPSE_W,
    height: ELLIPSE_H,
    top: -(SCREEN_WIDTH * (153 / 375)),
    left: -(ELLIPSE_W - SCREEN_WIDTH) / 2,
    borderRadius: ELLIPSE_W,
    backgroundColor: '#1C1C2E',
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
    color: '#FFFFFF',
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 52,
  },
});
