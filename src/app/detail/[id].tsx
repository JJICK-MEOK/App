import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Image,
  Linking,
} from 'react-native';
import { Loading } from '@/src/components/Loading/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import EyeOn from '@/assets/images/EyeOn.svg';
import HeartDisabled from '@/assets/images/HeartDisabled.svg';
import CloseLarge from '@/assets/images/CloseLarge.svg';
import ZoomButton from '@/src/components/Button/ZoomButton';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import DetailTab from '@/src/components/Tab/DetailTab';
import BottomActionBar from '@/src/components/Layout/BottomActionBar';
import ChipBadge from '@/src/components/Chip/ChipBadge';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { getDetailData } from '@/src/api/pages';
import { addFavorite, deleteFavorite } from '@/src/api/favorites';
import { getTagVariant } from '@/src/utils/tagVariant';

const TABS = [
  { key: 'info', label: '정보' },
  { key: 'review', label: '후기' },
];

const ACTIVITY_TYPE_LABEL: Record<string, string> = {
  PROGRAM: '프로그램',
  ONEDAY: '원데이',
  ONE_DAY: '원데이',
  EVENT: '행사·강연',
  CLUB: '동아리',
};

const BOTTOM_BAR_HEIGHT = 114;

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(isoString: string) {
  const d = new Date(isoString);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}.`;
}

function formatActivityDate(isoString: string) {
  const d = new Date(isoString);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = WEEKDAYS[d.getDay()];
  return `${y}년 ${m}월 ${day}일(${weekday})`;
}

function formatPrice(price: number) {
  return price === 0 ? '무료' : `${price.toLocaleString()}원`;
}

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const activityId = Number(id);

  const [activeTab, setActiveTab] = useState('info');
  const [saved, setSaved] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const scrollYRef = useRef(0);
  const isPullingRef = useRef(false);
  const pullAnim = useRef(new Animated.Value(0)).current;

  const PULL_THRESHOLD = 60;
  const PULL_MAX = 80;

  const { data, refetch } = useQuery({
    queryKey: ['detail', activityId],
    queryFn: () => getDetailData(activityId),
    enabled: !!activityId,
  });

  useEffect(() => {
    if (data?.liked !== undefined) {
      setSaved(data.liked);
    }
  }, [data?.liked]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleSavePress = () => {
    const nextSaved = !saved;
    setSaved(nextSaved);
    if (nextSaved) {
      addFavorite(activityId).catch(() => setSaved(!nextSaved));
    } else {
      deleteFavorite(activityId).catch(() => setSaved(!nextSaved));
    }
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
    })
  ).current;

  const infoRows = data
    ? [
        { label: '주최기관', value: data.organizer },
        {
          label: '모집기간',
          value: `${formatDate(data.recruitStartAt)} ~ ${formatDate(data.recruitEndAt)}`,
        },
        {
          label: '활동날짜(기간)',
          value: ['ONEDAY', 'ONE_DAY'].includes(data.activityType)
            ? formatActivityDate(data.startAt)
            : `${formatActivityDate(data.startAt)}부터 ${formatActivityDate(data.endAt)}`,
        },
        { label: '대상', value: data.target },
        { label: '금액', value: formatPrice(data.price) },
        { label: '설명', value: data.description },
        { label: '문의안내', value: data.contactInfo },
      ].filter((row) => row.value)
    : [];


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ArrowLeftBar onPress={() => router.back()} />

        <View {...panResponder.panHandlers} style={{ flex: 1 }}>
        <Animated.View style={[styles.pullArea, { height: pullAnim }]}>
          {isPulling && <Loading />}
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => { scrollYRef.current = e.nativeEvent.contentOffset.y; }}
          scrollEventThrottle={16}
        >
          <View style={styles.card}>
            <View style={styles.thumbnail}>
              {data?.thumbnailUrl ? (
                <Image
                  source={{ uri: data.thumbnailUrl }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              ) : null}
              <View style={styles.zoomButtonPos}>
                <ZoomButton onPress={() => setZoomed(true)} />
              </View>
            </View>

            <View style={styles.metaRow}>
              <ChipBadge
                label={ACTIVITY_TYPE_LABEL[data?.activityType ?? ''] ?? (data?.activityType ?? '')}
                variant="category"
              />
              <View style={styles.statsRow}>
                <Typography size="sm" weight="semiBold" style={styles.DDay}>
                  D-{data?.deadline ?? '-'}
                </Typography>
                <View style={styles.statItem}>
                  <EyeOn width={14} height={14} color="#CCCCCC" />
                  <Typography size="sm" style={styles.statText}>
                    {data?.viewCount ?? 0}
                  </Typography>
                </View>
                <View style={styles.statItem}>
                  <HeartDisabled width={14} height={14} />
                  <Typography size="sm" style={styles.statText}>
                    {data?.likeCount ?? 0}
                  </Typography>
                </View>
              </View>
            </View>

            <Typography size="xxl" weight="semiBold" style={styles.title}>
              {data?.title ?? ''}
            </Typography>

            <Typography size="sm" weight="medium" style={styles.date}>
              {data ? `${formatDate(data.startAt)} ~ ${formatDate(data.endAt)}` : ''}
            </Typography>

            <View style={styles.tagsRow}>
              {(data?.hashtags ?? []).map((tag, i) => (
                <ChipBadge key={tag} label={tag} variant={getTagVariant(tag, i)} />
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
                  {`<${data?.title ?? ''}>`}
                </Typography>
                <View style={styles.posterPlaceholder}>
                  {data?.thumbnailUrl ? (
                    <Image
                      source={{ uri: data.thumbnailUrl }}
                      style={StyleSheet.absoluteFill}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
              </View>

              {infoRows.map((row) => (
                <View key={row.label} style={styles.infoRow}>
                  <View style={styles.infoLabelRow}>
                    <View style={styles.infoAccent} />
                    <Typography size="md" weight="semiBold" color="tertiary">
                      {row.label}
                    </Typography>
                  </View>
                  <View style={styles.infoValueRow}>
                    <Typography size="md" style={styles.infoValueBullet}>{'• '}</Typography>
                    <Typography size="md" style={styles.infoValueText} lineBreakStrategyIOS="hangul-word" android_hyphenationFrequency="none">
                      {row.value}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        </View>

        <View style={styles.bottomBar}>
          <BottomActionBar
            saved={saved}
            onSavePress={handleSavePress}
            label="바로 지원하기"
            onPress={() => {
              if (data?.sourceUrl) Linking.openURL(data.sourceUrl);
            }}
          />
        </View>
      </View>
      <Modal visible={zoomed} animationType="fade" statusBarTranslucent>
        <View style={styles.zoomedOverlay}>
          <TouchableOpacity style={styles.zoomedClose} onPress={() => setZoomed(false)}>
            <CloseLarge width={30} height={30} color="#FFF" />
          </TouchableOpacity>
          {data?.thumbnailUrl ? (
            <Image
              source={{ uri: data.thumbnailUrl }}
              style={styles.zoomedImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.zoomedImage} />
          )}
        </View>
      </Modal>
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
  pullArea: {
    overflow: 'hidden',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: colors.neutral.white,
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
    overflow: 'hidden',
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
    overflow: 'hidden',
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
  infoValueRow: {
    flexDirection: 'row',
    paddingLeft: 8,
  },
  infoValueBullet: {
    color: colors.text.primary,
    lineHeight: 22,
  },
  infoValueText: {
    flex: 1,
    color: colors.text.primary,
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

  zoomedOverlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedClose: {
    position: 'absolute',
    top: 52,
    left: 20,
    zIndex: 10,
  },
  zoomedImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#D9D9D9',
  },
});
