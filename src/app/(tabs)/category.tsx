import { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { Dropdown } from '@/src/components/Filter/Dropdown';
import ActivityCard from '@/src/components/Card/ActivityCard';
import CategoryFilter from '@/src/components/Modal/CategoryFilter';
import { colors } from '@/src/constants/colors';

const CATEGORY_OPTIONS = [
  '전체',
  '운동/액티비티',
  '문화/공연',
  '공예/만들기',
  '댄스/무용',
  '요리/베이킹',
  '사진/영상',
  '음악/악기',
  '인문학/책/글',
  '여행/산책/탐방',
  '해외/언어',
  '봉사활동',
  '자기계발/클래스',
  '커리어/실무',
  '기타',
];

const SORT_OPTIONS = ['추천순', '인기순', '마감순'];

const MOCK_ACTIVITIES = Array.from({ length: 9 }, () => ({
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

export default function CategoryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('추천순');
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);

  return (
    <ScreenLayout style={{ backgroundColor: colors.neutral.white }}>
      <ArrowLeftBar onPress={() => router.back()} title="프로그램" />

      <View style={styles.filterRow}>
        <Dropdown label={selectedCategory} onPress={() => setActiveSheet('category')} />
        <Dropdown label={selectedSort} onPress={() => setActiveSheet('sort')} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {MOCK_ACTIVITIES.map((activity, i) => (
          <ActivityCard key={i} {...activity} />
        ))}
      </ScrollView>

      {activeSheet && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setActiveSheet(null)} />
          <View style={styles.sheetContainer}>
            <CategoryFilter
              title={activeSheet === 'category' ? '활동 분야 선택' : '정렬'}
              options={activeSheet === 'category' ? CATEGORY_OPTIONS : SORT_OPTIONS}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 30,
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
