import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftBar from '@/src/components/Bar/ArrowLeftBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import ChipChoice from '@/src/components/Chip/ChipChoice';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

const CHIP_ROWS = [
  ['#조용한', '#편안한', '#활기찬', '#사람많은'],
  ['#혼자서', '#소규모', '#감성적'],
  ['#새로운', '#배움', '#힐링', '#도전적'],
  ['#힙한', '#아날로그', '#실용적'],
  ['#예술적', '#어울리는', '#내향인환영'],
  ['#제대로', '#가볍게'],
];

export default function OnboardingStep6() {
  const router = useRouter();
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());

  const toggleChip = (label: string) => {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else if (next.size < 5) {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <ScreenLayout style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: 251 }]} />
        </View>
      </View>
      <ArrowLeftBar onPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Typography size="xxxl" weight="bold">
            {'어떤 분위기의\n활동이 끌리나요?'}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            최대 5개까지 선택해주세요.
          </Typography>
        </View>

        <View style={styles.chipWrapper}>
          <View style={styles.chipContainer}>
            {CHIP_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.chipRow}>
                {row.map((label) => (
                  <ChipChoice
                    key={label}
                    label={label}
                    selected={selectedChips.has(label)}
                    onPress={() => toggleChip(label)}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="다음"
          onPress={() => router.push('/onboarding/step7')}
          variant="primary"
          disabled={selectedChips.size === 0}
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
    paddingBottom: 63,
    gap: 72,
  },
  headerBlock: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 13,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  chipWrapper: {
    marginHorizontal: -20,
    overflow: 'hidden',
  },
  chipContainer: {
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
  progressContainer: { paddingHorizontal: 20, marginBottom: 9, marginTop: 53 },
  progressTrack: { height: 2, backgroundColor: '#DDD' },
  progressFill: { height: 2, backgroundColor: '#FFE066' },
});
