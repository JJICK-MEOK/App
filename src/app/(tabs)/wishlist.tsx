import { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Loading } from '@/src/components/Loading/Loading';
import { useRouter, useFocusEffect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Dropdown } from '@/src/components/Filter/Dropdown';
import CategoryFilter from '@/src/components/Modal/CategoryFilter';
import { colors } from '@/src/constants/colors';
import { getTags } from '@/src/api/tags';
import CategoryBar from '@/src/components/Bar/CategoryBar';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { Typography } from '@/src/components/Typography/Typography';
import CardSaved from '@/src/components/Card/CardSaved';
import { getFavorites } from '@/src/api/favorites';
import { getDetailData } from '@/src/api/pages';
import type { DetailActivity } from '@/src/types/activities';
import { getTagVariant } from '@/src/utils/tagVariant';

const ACTIVITY_TYPE_LABEL: Record<string, string> = {
  PROGRAM: '프로그램',
  ONEDAY: '원데이',
  ONE_DAY: '원데이',
  EVENT: '행사·강연',
  CLUB: '동아리',
};

const SORT_MAP: Record<string, 'saved' | 'deadline'> = {
  '담은순': 'saved',
  '마감순': 'deadline',
};

export default function ProgramListScreen() {
  const router = useRouter();
  const [tabOptions, setTabOptions] = useState<string[]>(['전체']);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('담은순');
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const scrollYRef = useRef(0);
  const isPullingRef = useRef(false);
  const pullAnim = useRef(new Animated.Value(0)).current;
  const [isPulling, setIsPulling] = useState(false);

  const PULL_THRESHOLD = 60;
  const PULL_MAX = 80;

  const { data: activities = [], refetch, isFetching } = useQuery({
    queryKey: ['favorites', SORT_MAP[selectedSort]],
    queryFn: async () => {
      const favorites = await getFavorites(SORT_MAP[selectedSort]);
      const details = await Promise.all(
        favorites.map((f) => getDetailData(f.activityId)),
      );
      return details;
    },
    staleTime: 0,
  });

  useFocusEffect(
    useCallback(() => {
      setSelectedTab('전체');
      setSelectedSort('담은순');
      setRemovedIds(new Set());
      refetch();
    }, [refetch]),
  );

  const filteredActivities = activities.filter((activity: DetailActivity) => {
    if (removedIds.has(activity.id)) return false;
    if (selectedTab === '전체') return true;
    return ACTIVITY_TYPE_LABEL[activity.activityType] === selectedTab;
  });

  const handleRemove = (activityId: number) => {
    setRemovedIds((prev) => new Set(prev).add(activityId));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dy, dx }) =>
        scrollYRef.current <= 0 && dy > 8 && dy > Math.abs(dx) * 2,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) {
          const pull = Math.min(dy * 0.4, PULL_MAX);
          pullAnim.setValue(pull);
          if (pull >= PULL_THRESHOLD && !isPullingRef.current) {
            isPullingRef.current = true;
            setIsPulling(true);
          }
        }
      },
      onPanResponderRelease: (_, { dy }) => {
        const pull = Math.min(dy * 0.4, PULL_MAX);
        if (pull >= PULL_THRESHOLD) {
          Animated.spring(pullAnim, { toValue: PULL_MAX, useNativeDriver: false }).start();
          refetch().finally(() => {
            isPullingRef.current = false;
            setIsPulling(false);
            setRemovedIds(new Set());
            Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
          });
        } else {
          isPullingRef.current = false;
          setIsPulling(false);
          Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
        }
      },
      onPanResponderTerminate: () => {
        isPullingRef.current = false;
        setIsPulling(false);
        Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
      },
    }),
  ).current;

  useEffect(() => {
    const ORDER = ['프로그램', '원데이', '행사·강연', '동아리'];
    getTags('ACTIVITY_CATEGORY')
      .then((tags) => {
        const sorted = [...tags].sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name));
        setTabOptions(['전체', ...sorted.map((t) => t.name)]);
      })
      .catch(() => {});
  }, []);

  return (
    <ScreenLayout style={{ backgroundColor: colors.neutral.white }}>
      <View style={styles.appBar}>
        <ArrowLeftBar onPress={() => router.back()} />
        <View style={styles.appBarTitle} pointerEvents="none">
          <Typography size="xl" weight="semiBold">
            찜
          </Typography>
        </View>
      </View>
      <CategoryBar
        tabs={tabOptions}
        selected={selectedTab}
        onSelect={setSelectedTab}
        gap={15}
        paddingHorizontal={26}
      />
      <View {...panResponder.panHandlers} style={styles.scrollView}>
        <Animated.View style={[styles.pullArea, { height: pullAnim }]}>
          {(isPulling || isFetching) && <Loading />}
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onScroll={(e) => {
            scrollYRef.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
        >
          {filteredActivities.length > 0 && (
            <View style={styles.filterRow}>
              <Dropdown label={selectedSort} onPress={() => setShowSortSheet(true)} />
            </View>
          )}
          {filteredActivities.length === 0 ? (
            <View style={styles.emptyState}>
              <Typography size="lg" weight="medium" color="tertiary" style={styles.emptyText}>
                {'찜 한 활동이 없습니다.\n마음에 드는 활동에 하트를 눌러보세요.'}
              </Typography>
            </View>
          ) : (
            <View style={styles.grid}>
              {Array.from({ length: Math.ceil(filteredActivities.length / 2) }, (_, rowIndex) => {
                const rowItems = filteredActivities.slice(rowIndex * 2, rowIndex * 2 + 2);
                const isLastRow = rowIndex === Math.ceil(filteredActivities.length / 2) - 1;
                const isOddTotal = filteredActivities.length % 2 !== 0;
                return (
                  <View key={rowIndex} style={styles.row}>
                    {rowItems.map((activity) => (
                      <TouchableOpacity
                        key={activity.id}
                        style={styles.gridItem}
                        activeOpacity={0.9}
                        onPress={() => router.push(`/detail/${activity.id}`)}
                      >
                        <CardSaved
                          activityId={activity.id}
                          dday={`D-${activity.deadline}`}
                          title={activity.title}
                          tags={activity.hashtags.slice(0, 2).map((tag, i) => ({
                            label: tag,
                            variant: getTagVariant(tag, i),
                          }))}
                          thumbnailUrl={activity.thumbnailUrl}
                          onRemove={handleRemove}
                        />
                      </TouchableOpacity>
                    ))}
                    {isLastRow && isOddTotal && <View style={styles.gridItem} />}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>

      <Modal
        visible={showSortSheet}
        transparent
        statusBarTranslucent
        onRequestClose={() => setShowSortSheet(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setShowSortSheet(false)} />
        <View style={styles.sheetContainer}>
          <CategoryFilter
            title="정렬"
            options={['담은순', '마감순']}
            selected={selectedSort}
            optionGap={35}
            height={322}
            onSelect={(item) => {
              setSelectedSort(item);
              setShowSortSheet(false);
            }}
            onClose={() => setShowSortSheet(false)}
          />
        </View>
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 26,
    marginTop: 17,
  },
  listContent: {
    paddingBottom: 140,
  },
  pullArea: {
    overflow: 'hidden',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: colors.neutral.white,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  grid: {
    gap: 29,
    paddingTop: 15,
    paddingHorizontal: 26,
  },
  row: {
    flexDirection: 'row',
    gap: 19,
  },
  gridItem: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  appBar: {
    height: 60,
  },
  appBarTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
