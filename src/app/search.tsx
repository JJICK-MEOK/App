import { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import SearchBar from '@/src/components/Input/SearchBar';
import ActivityCard from '@/src/components/Card/ActivityCard';
import { Typography } from '@/src/components/Typography/Typography';
import ArrowLeft from '@/assets/images/ArrowLeft.svg';
import { colors } from '@/src/constants/colors';

const MOCK_ACTIVITIES = [
  {
    id: 1,
    dday: 'D-11',
    title: '서울 야외 도서관 힙독 클럽 2기 모집',
    tags: [
      { label: '#취향태그', variant: 'mood' as const },
      { label: '#취향태그', variant: 'intensity' as const },
    ],
    viewCount: 240,
    likeCount: 70,
  },
  {
    id: 2,
    dday: 'D-5',
    title: '홍대 드로잉 클래스 3기 모집',
    tags: [{ label: '#취향태그', variant: 'duration' as const }],
    viewCount: 130,
    likeCount: 45,
  },
  {
    id: 3,
    dday: 'D-3',
    title: '한국 광고 아카데미 한광아 11기 모집',
    tags: [
      { label: '#취향태그', variant: 'purpose' as const },
      { label: '#취향태그', variant: 'groupSize' as const },
    ],
    viewCount: 320,
    likeCount: 90,
  },
  {
    id: 4,
    dday: 'D-20',
    title: '강남 요리 원데이 클래스',
    tags: [{ label: '#취향태그', variant: 'mood' as const }],
    viewCount: 80,
    likeCount: 30,
  },
  {
    id: 5,
    dday: 'D-7',
    title: '서울 사진 동아리 신입 모집',
    tags: [{ label: '#취향태그', variant: 'intensity' as const }],
    viewCount: 200,
    likeCount: 60,
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const results = useMemo(() => {
    if (!searchText.trim()) return null;
    return MOCK_ACTIVITIES.filter((a) => a.title.includes(searchText.trim()));
  }, [searchText]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.white }} edges={['top']}>
      <ScreenLayout style={{ backgroundColor: colors.neutral.white }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} hitSlop={12}>
            <ArrowLeft width={10} height={18.5} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <SearchBar value={searchText} onChangeText={setSearchText} />
          </View>
        </View>

        {results !== null &&
          (results.length === 0 ? (
            <View style={styles.emptyState}>
              <Typography size="lg" weight="medium" style={styles.emptyText}>
                {`'${searchText}'에 대한 검색 결과가 없습니다.`}
              </Typography>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultContent}
            >
              <Typography size="lg" weight="medium" style={styles.resultLabel}>
                {`'${searchText}'에 대한 검색 결과`}
              </Typography>
              <View style={styles.cards}>
                {results.map((item, i) => (
                  <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => router.push(`/detail/${item.id}`)}>
                    <ActivityCard {...item} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ))}
      </ScreenLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    paddingHorizontal: 22,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexShrink: 0,
  },
  resultContent: {
    paddingHorizontal: 22,
    paddingTop: 23,
    paddingBottom: 40,
    gap: 20,
  },
  resultLabel: {
    color: colors.text.tertiary,
  },
  cards: {
    gap: 24,
  },
  emptyState: {
    paddingTop: 23,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.tertiary,
  },
});
