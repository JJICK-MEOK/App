import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { Loading } from '@/src/components/Loading/Loading';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { Dropdown } from '@/src/components/Filter/Dropdown';
import ActivityCard from '@/src/components/Card/ActivityCard';
import CategoryFilter from '@/src/components/Modal/CategoryFilter';
import { colors } from '@/src/constants/colors';
import { getTags } from '@/src/api/tags';

const SORT_OPTIONS = ['추천순', '인기순', '마감순'];

const MOCK_ACTIVITIES = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  dday: 'D-11',
  title: '서울야외도서관 힙독클럽 2기 모집',
  tags: [
    { label: '#취향태그', variant: 'mood' as const },
    { label: '#취향태그', variant: 'intensity' as const },
  ],
  viewCount: 240,
  likeCount: 70,
}));

type SheetType = 'category' | 'sort' | null;

export default function ProgramListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('추천순');
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [categoryOptions, setCategoryOptions] = useState<string[]>(['전체']);
  const [isPulling, setIsPulling] = useState(false);
  const scrollYRef = useRef(0);
  const isPullingRef = useRef(false);
  const pullAnim = useRef(new Animated.Value(0)).current;

  const PULL_THRESHOLD = 60;
  const PULL_MAX = 80;

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
          setTimeout(() => {
            isPullingRef.current = false;
            setIsPulling(false);
            Animated.spring(pullAnim, { toValue: 0, useNativeDriver: false }).start();
          }, 1500);
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
    })
  ).current;

  useEffect(() => {
    getTags('TOPIC_CATEGORY')
      .then((tags) => setCategoryOptions(['전체', ...tags.map((t) => t.name)]))
      .catch(() => {});
  }, []);

  return (
    <ScreenLayout style={{ backgroundColor: colors.neutral.white, paddingTop: insets.top }}>
      <ArrowLeftBar onPress={() => router.back()} title="프로그램" />

      <View style={styles.filterRow}>
        <Dropdown label={selectedCategory} onPress={() => setActiveSheet('category')} />
        <Dropdown label={selectedSort} onPress={() => setActiveSheet('sort')} />
      </View>

      <View {...panResponder.panHandlers} style={{ flex: 1 }}>
        <Animated.View style={[styles.pullArea, { height: pullAnim }]}>
          {isPulling && <Loading />}
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onScroll={(e) => { scrollYRef.current = e.nativeEvent.contentOffset.y; }}
          scrollEventThrottle={16}
        >
          {MOCK_ACTIVITIES.map((activity, i) => (
            <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => router.push(`/detail/${activity.id}`)}>
              <ActivityCard {...activity} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {activeSheet && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setActiveSheet(null)} />
          <View style={styles.sheetContainer}>
            <CategoryFilter
              title={activeSheet === 'category' ? '활동 분야 선택' : '정렬'}
              options={activeSheet === 'category' ? categoryOptions : SORT_OPTIONS}
              selected={activeSheet === 'category' ? selectedCategory : selectedSort}
              optionGap={activeSheet === 'sort' ? 35 : 30}
              height={activeSheet === 'category' ? 428 : 322}
              onSelect={(item) => {
                if (activeSheet === 'category') setSelectedCategory(item);
                else setSelectedSort(item);
                setActiveSheet(null);
              }}
              onClose={() => setActiveSheet(null)}
            />
          </View>
        </>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 30,
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
});
