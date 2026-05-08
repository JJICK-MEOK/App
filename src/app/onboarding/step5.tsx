import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import CloseSmall from '@/assets/images/CloseSmall.svg';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { LocationButton, LocationPosition } from '@/src/components/Button/LocationButton';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

const NORMAL_ROWS = [
  ['서울', '경기', '인천', '강원'],
  ['충북', '충남', '세종', '대전'],
  ['광주', '전북', '경북', '대구'],
  ['제주', '전남', '경남/울산', '부산'],
];

const SEOUL_EXPANDED_ROWS = [
  ['서울', '경기', '인천', '강원'],
  ['서울전체', '강남', '강동', '강북'],
  ['강서', '관악', '광진', '구로'],
  ['금천', '노원', '도봉', '동대문'],
  ['동작', '마포', '서대문', '서초'],
  ['성동', '성북', '송파', '양천'],
  ['영등포', '용산', '은평', '종로'],
  ['중구', '중랑', '', ''],
  ['광주', '전북', '경북', '대구'],
  ['제주', '전남', '경남/울산', '부산'],
];

const ALL_SEOUL_DISTRICTS = [
  '강남',
  '강동',
  '강북',
  '강서',
  '관악',
  '광진',
  '구로',
  '금천',
  '노원',
  '도봉',
  '동대문',
  '동작',
  '마포',
  '서대문',
  '서초',
  '성동',
  '성북',
  '송파',
  '양천',
  '영등포',
  '용산',
  '은평',
  '종로',
  '중구',
  '중랑',
];

const NON_SEOUL_REGIONS = [
  '경기',
  '인천',
  '강원',
  '충북',
  '충남',
  '세종',
  '대전',
  '광주',
  '전북',
  '경북',
  '대구',
  '제주',
  '전남',
  '경남/울산',
  '부산',
];

const getPosition = (rowIndex: number, colIndex: number, totalRows: number): LocationPosition => {
  if (rowIndex === 0 && colIndex === 0) return 'topLeft';
  if (rowIndex === 0 && colIndex === 3) return 'topRight';
  if (rowIndex === totalRows - 1 && colIndex === 0) return 'bottomLeft';
  if (rowIndex === totalRows - 1 && colIndex === 3) return 'bottomRight';
  return 'middle';
};

const TOTAL_STEPS = 4;
const CURRENT_STEP = 2;

export default function OnboardingStep5() {
  const router = useRouter();
  const [isSeoulExpanded, setIsSeoulExpanded] = useState(false);
  const [isSeoulAllSelected, setIsSeoulAllSelected] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());

  const displayRows = isSeoulExpanded ? SEOUL_EXPANDED_ROWS : NORMAL_ROWS;

  const handlePress = (label: string) => {
    if (!label) return;

    if (label === '서울') {
      setIsSeoulExpanded((prev) => !prev);
      return;
    }

    if (label === '서울전체') {
      if (isSeoulAllSelected) {
        setIsSeoulAllSelected(false);
      } else {
        setIsSeoulAllSelected(true);
        setSelectedLocations((prev) => {
          const next = new Set(prev);
          ALL_SEOUL_DISTRICTS.forEach((d) => next.delete(d));
          const nonSeoulSelected = NON_SEOUL_REGIONS.filter((r) => next.has(r));
          if (nonSeoulSelected.length > 2) {
            nonSeoulSelected.slice(2).forEach((r) => next.delete(r));
          }
          return next;
        });
      }
      return;
    }

    if (ALL_SEOUL_DISTRICTS.includes(label)) {
      if (isSeoulAllSelected) return;
      setSelectedLocations((prev) => {
        const next = new Set(prev);
        if (next.has(label)) {
          next.delete(label);
        } else if (next.size < 3) {
          next.add(label);
        }
        return next;
      });
      return;
    }

    // Non-Seoul region
    const limit = isSeoulAllSelected ? 2 : 3;
    setSelectedLocations((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        const currentCount = isSeoulAllSelected
          ? NON_SEOUL_REGIONS.filter((r) => next.has(r)).length
          : next.size;
        if (currentCount < limit) {
          next.add(label);
        }
      }
      return next;
    });
  };

  const isSelected = (label: string) => {
    if (label === '서울') return isSeoulAllSelected;
    if (label === '서울전체') return isSeoulAllSelected;
    if (ALL_SEOUL_DISTRICTS.includes(label))
      return isSeoulAllSelected || selectedLocations.has(label);
    return selectedLocations.has(label);
  };

  const getChips = (): string[] => {
    const chips: string[] = [];
    if (isSeoulAllSelected) {
      chips.push('서울');
    } else {
      ALL_SEOUL_DISTRICTS.forEach((d) => {
        if (selectedLocations.has(d)) chips.push(d);
      });
    }
    NON_SEOUL_REGIONS.forEach((r) => {
      if (selectedLocations.has(r)) chips.push(r);
    });
    return chips;
  };

  const removeChip = (label: string) => {
    if (label === '서울') {
      setIsSeoulAllSelected(false);
      return;
    }
    setSelectedLocations((prev) => {
      const next = new Set(prev);
      next.delete(label);
      return next;
    });
  };

  const chips = getChips();

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }]} />
        </View>
      </View>
      <ArrowLeftBar onPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Typography size="xxxl" weight="bold">
            {'주로 활동하는\n지역을 알려주세요'}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            최대 3곳까지 설정할 수 있어요.
          </Typography>
        </View>

        <View style={styles.locationArea}>
          {chips.length > 0 && (
            <View style={styles.chipRow}>
              {chips.map((chip) => (
                <View key={chip} style={styles.chip}>
                  <Typography size="sm" style={styles.chipLabel}>
                    {chip}
                  </Typography>
                  <TouchableOpacity onPress={() => removeChip(chip)} hitSlop={8}>
                    <CloseSmall width={10} height={10} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View style={styles.grid}>
            {displayRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.gridRow}>
                {row.map((location, colIndex) =>
                  location ? (
                    <LocationButton
                      key={`${rowIndex}-${colIndex}`}
                      label={location}
                      position={getPosition(rowIndex, colIndex, displayRows.length)}
                      selected={isSelected(location)}
                      onPress={() => handlePress(location)}
                    />
                  ) : (
                    <View key={`${rowIndex}-empty-${colIndex}`} style={styles.emptyCell} />
                  ),
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => router.push('/onboarding/step6')}
          variant="primary"
          disabled={chips.length === 0}
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 99,
    gap: 24,
    alignItems: 'center',
  },

  headerBlock: {
    width: '100%',
    gap: 13,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  locationArea: {
    width: 332,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 21,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  chipLabel: {
    color: colors.text.primary,
    textAlign: 'center',
  },
  grid: {
    width: 332,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
    overflow: 'hidden',
  },
  gridRow: {
    flexDirection: 'row',
  },
  emptyCell: {
    width: 83,
    height: 57,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, marginBottom: 9, marginTop: 53 },
  progressTrack: { height: 2, backgroundColor: '#DDD' },
  progressFill: { height: 2, backgroundColor: '#FFE066' },
});
