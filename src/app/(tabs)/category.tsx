import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Dropdown } from '@/src/components/Filter/Dropdown';
import ActivityCard from '@/src/components/Card/ActivityCard';
import CategoryFilter from '@/src/components/Modal/CategoryFilter';
import { colors } from '@/src/constants/colors';
import { getTags } from '@/src/api/tags';
import AppBar from '@/src/components/Bar/AppBar';
import TabBar from '@/src/components/Tab/TabBar';

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

export default function ProgramListScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('추천순');
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [categoryOptions, setCategoryOptions] = useState<string[]>(['전체']);
  const [tabOptions, setTabOptions] = useState<string[]>(['전체']);
  const [selectedTab, setSelectedTab] = useState('전체');

  useEffect(() => {
    const ORDER = ['프로그램', '원데이', '행사·강연', '동아리'];
    getTags('ACTIVITY_CATEGORY')
      .then((tags) => {
        const sorted = [...tags].sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name));
        setCategoryOptions(['전체', ...sorted.map((t) => t.name)]);
      })
      .catch(() => {});

    getTags('TOPIC_CATEGORY')
      .then((tags) => setTabOptions(['전체', ...tags.map((t) => t.name)]))
      .catch(() => {});
  }, []);

  return (
    <ScreenLayout style={{ backgroundColor: colors.neutral.white }}>
      <AppBar name="00" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        <View style={styles.fullWidth}>
          <TabBar tabs={tabOptions} selected={selectedTab} onSelect={setSelectedTab} />
        </View>
        <View style={[styles.filterRow, styles.fullWidth]}>
          <Dropdown label={selectedCategory} onPress={() => setActiveSheet('category')} />
          <Dropdown label={selectedSort} onPress={() => setActiveSheet('sort')} />
        </View>
        <View style={styles.cards}>
          {MOCK_ACTIVITIES.map((activity, i) => (
            <ActivityCard key={i} {...activity} />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={!!activeSheet}
        transparent
        statusBarTranslucent
        onRequestClose={() => setActiveSheet(null)}
      >
        <Pressable style={styles.backdrop} onPress={() => setActiveSheet(null)} />
        <View style={styles.sheetContainer}>
          <CategoryFilter
            title={activeSheet === 'category' ? '카테고리 선택' : '정렬'}
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
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    marginHorizontal: -20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 27,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  cards: {
    paddingTop: 17,
    gap: 24,
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
