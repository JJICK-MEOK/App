import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Dropdown } from '@/src/components/Filter/Dropdown';
import CategoryFilter from '@/src/components/Modal/CategoryFilter';
import { colors } from '@/src/constants/colors';
import { getTags } from '@/src/api/tags';
import CategoryBar from '@/src/components/Bar/CategoryBar';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { Typography } from '@/src/components/Typography/Typography';
import CardSaved from '@/src/components/Card/CardSaved';

const MOCK_SAVED = Array.from({ length: 6 }, () => ({
  dday: 'D-12',
  title: '제목(활동명) 제목',
  tags: [
    { label: '#취향태그', variant: 'mood' as const },
    { label: '#취향태그', variant: 'intensity' as const },
  ],
}));

export default function ProgramListScreen() {
  const router = useRouter();
  const [tabOptions, setTabOptions] = useState<string[]>(['전체']);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('담은순');
  const [showSortSheet, setShowSortSheet] = useState(false);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.listContent}
      >
        {MOCK_SAVED.length > 0 && (
          <View style={styles.filterRow}>
            <Dropdown label={selectedSort} onPress={() => setShowSortSheet(true)} />
          </View>
        )}
        {MOCK_SAVED.length === 0 ? (
          <View style={styles.emptyState}>
            <Typography size="lg" weight="medium" color="tertiary" style={styles.emptyText}>
              {'찜 한 활동이 없습니다.\n마음에 드는 활동에 하트를 눌러보세요.'}
            </Typography>
          </View>
        ) : (
          <View style={styles.grid}>
            {Array.from({ length: Math.ceil(MOCK_SAVED.length / 2) }, (_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {MOCK_SAVED.slice(rowIndex * 2, rowIndex * 2 + 2).map((card, colIndex) => (
                  <View key={colIndex} style={styles.gridItem}>
                    <CardSaved {...card} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

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
