import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import CardStack from '@/src/components/Card/CardStack';
import { useActivities } from '@/src/hooks/useActivities';
import { useOnboardingStore } from '@/src/store/onboardingStore';
import type { Activity } from '@/src/types/activities';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ELLIPSE_W = SCREEN_WIDTH * (614 / 375);
const ELLIPSE_H = SCREEN_WIDTH * (507 / 375);

export default function CustomScreen() {
  const { activities, fetchMore, isLoading } = useActivities();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const nickname = useOnboardingStore((s) => s.nickname);

  const handlePressCard = (activity: Activity) => {
    router.push(`/detail/${activity.id}`);
  };

  return (
    <ScreenLayout style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.bgEllipse} />

      <View style={styles.bar}>
        <Text style={styles.barText}>{nickname} 님을 위해 준비했어요!</Text>
      </View>

      <View style={styles.cardArea}>
        {activities.length === 0 && isLoading ? (
          <ActivityIndicator color="#999" />
        ) : (
          <CardStack
            activities={activities}
            onEndReached={fetchMore}
            onPressCard={handlePressCard}
          />
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
    paddingVertical: 10,
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
    paddingTop: 82,
  },
});
