import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import EyeOn from '@/assets/images/EyeOn.svg';
import HeartDisabled from '@/assets/images/HeartDisabled.svg';
import ZoomButton from '@/src/components/Button/ZoomButton';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import DetailTab from '@/src/components/Tab/DetailTab';
import BottomActionBar from '@/src/components/Layout/BottomActionBar';
import ChipBadge, { type ChipBadgeVariant } from '@/src/components/Chip/ChipBadge';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

const TAG_CHIPS: { label: string; variant: ChipBadgeVariant }[] = [
  { label: '#취향태그', variant: 'mood' },
  { label: '#힐링', variant: 'groupSize' },
  { label: '#힐링태그', variant: 'duration' },
];

const TABS = [
  { key: 'info', label: '정보' },
  { key: 'review', label: '후기' },
];

const INFO_ROWS = [
  { label: '주최기간', value: '서울야외도서관 / 서울도서관' },
  { label: '모집기간', value: '2026.04.01 10:00 - 마감종료' },
  { label: '활동날짜(기간)', value: '2026년 4월 23일(목)부터 2026년 12월 31(목)' },
  { label: '대상', value: '만 14세 이상, 독서에 관심 있는 사람' },
  { label: '금액', value: '무료' },
  {
    label: '설명',
    value:
      '힙독클럽은 혼자 읽는 즐거움과 함께 읽는 재미를 경험할 수 있는 서울야외도서관의 온·오프라인 독서 커뮤니티입니다. 온라인 독서 활동부터 필사, 낭독, 저자 강연, 야외 독서프로그램까지 다양한 방식으로 책을 가볍고 꾸준하게 즐길 수 있습니다.',
  },
  { label: '문의안내 (문의처)', value: '힙독클럽 문의처 / 070-5143-5663' },
];

const BOTTOM_BAR_HEIGHT = 114;

export default function ActivityDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const [saved, setSaved] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ArrowLeftBar onPress={() => router.back()} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.thumbnail}>
              <View style={styles.zoomButtonPos}>
                <ZoomButton />
              </View>
            </View>

            <View style={styles.metaRow}>
              <ChipBadge label="프로그램" variant="category" />
              <View style={styles.statsRow}>
                <Typography size="sm" weight="semiBold" style={styles.DDay}>
                  D-7
                </Typography>
                <View style={styles.statItem}>
                  <EyeOn width={14} height={14} />
                  <Typography size="sm" style={styles.statText}>
                    240
                  </Typography>
                </View>
                <View style={styles.statItem}>
                  <HeartDisabled width={14} height={14} />
                  <Typography size="sm" style={styles.statText}>
                    70
                  </Typography>
                </View>
              </View>
            </View>

            <Typography size="xxl" weight="semiBold" style={styles.title}>
              {'서울야외도서관\n힙독클럽 2기 모집'}
            </Typography>

            <Typography size="sm" weight="medium" style={styles.date}>
              2026.04.23. ~ 2026.12.31.
            </Typography>

            <View style={styles.tagsRow}>
              {TAG_CHIPS.map((tag) => (
                <ChipBadge key={tag.label} label={tag.label} variant={tag.variant} />
              ))}
            </View>
          </View>

          <View style={styles.tabWrapper}>
            <DetailTab tabs={TABS} activeKey={activeTab} onTabChange={setActiveTab} />
          </View>

          {activeTab === 'info' && (
            <View style={styles.infoContent}>
              <View style={styles.posterSection}>
                <Typography size="lg" weight="semiBold" style={styles.sectionTitle}>
                  {'<힙독클럽 2기>'}
                </Typography>
                <View style={styles.posterPlaceholder} />
              </View>

              {INFO_ROWS.map((row) => (
                <View key={row.label} style={styles.infoRow}>
                  <View style={styles.infoLabelRow}>
                    <View style={styles.infoAccent} />
                    <Typography size="md" weight="semiBold" color="tertiary">
                      {row.label}
                    </Typography>
                  </View>
                  <Typography size="md" style={styles.infoValue}>
                    {`• ${row.value}`}
                  </Typography>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.bottomBar}>
          <BottomActionBar
            saved={saved}
            onSavePress={() => setSaved((v) => !v)}
            label="바로 지원하기"
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F6F6',
  },
  scrollContent: {
    paddingBottom: BOTTOM_BAR_HEIGHT,
  },

  card: {
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 15,
    marginBottom: 5,
  },
  zoomButtonPos: {
    position: 'absolute',
    right: 10,
    bottom: 9,
  },
  thumbnail: {
    width: 135,
    height: 135,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#D9D9D9',
    marginBottom: 21,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  DDay: {
    color: colors.text.primary,
    fontSize: 12,
  },
  statText: {
    color: colors.text.tertiary,
  },
  title: {
    color: colors.text.primary,
    lineHeight: 30,
    marginBottom: 10,
  },
  date: {
    color: colors.text.tertiary,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },

  tabWrapper: {
    backgroundColor: colors.neutral.white,
  },

  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 20,
    gap: 24,
  },
  posterSection: {
    gap: 11,
  },
  sectionTitle: {
    color: colors.text.primary,
  },
  posterPlaceholder: {
    width: '100%',
    aspectRatio: 335 / 473.786,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  infoRow: {
    gap: 11,
  },
  infoLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoAccent: {
    width: 4,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.primary.main,
  },
  infoValue: {
    color: colors.text.primary,
    paddingLeft: 8,
    lineHeight: 22,
  },

  reviewContent: {
    paddingVertical: 60,
    alignItems: 'center',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
