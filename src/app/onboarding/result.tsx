import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/src/store/onboardingStore';
import { ContentCard } from '@/src/components/Card/ContentCard';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

const MOCK_CARDS = [
  {
    title: '아무것도 몰라도\n락스타가 될 수 있어!',
    subtitle: '201P Rookies 13기',
    imageUri: '',
    tags: ['#소규모', '#실내', '#체험형'],
  },
  {
    title: '아무것도 몰라도\n락스타가 될 수 있어!',
    subtitle: '201P Rookies 13기',
    imageUri: '',
    tags: ['#가벼운', '#실외', '#혼자서'],
  },
  {
    title: '아무것도 몰라도\n락스타가 될 수 있어!',
    subtitle: '201P Rookies 13기',
    imageUri: '',
    tags: ['#힐링', '#소규모', '#체험형'],
  },
];

export default function OnboardingResult() {
  const router = useRouter();
  const nickname = useOnboardingStore((s) => s.nickname);

  return (
    <ScreenLayout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>
            {`${nickname}님은\n`}
            <Text style={styles.highlight}>{'소규모 ・가벼운 체험형'}</Text>
            {' 을\n선호해요'}
          </Text>
          <Typography size="md" style={styles.subtitle}>
            나만을 위한 추천 활동을 확인하세요.
          </Typography>
        </View>

        <View style={styles.cardList}>
          {MOCK_CARDS.map((card, index) => (
            <ContentCard key={index} {...card} />
          ))}
        </View>
      </ScrollView>

      <CTAContainer style={styles.cta}>
        <BottomCTA
          label="더 많은 추천 확인하기"
          onPress={() => router.replace('/(tabs)/home')}
          variant="primary"
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
    paddingBottom: 16,
    gap: 39,
  },
  headerBlock: {
    gap: 13,
  },
  title: {
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.text.primary,
  },
  highlight: {
    backgroundColor: colors.primary.sub,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  cardList: {
    flexDirection: 'column',
    gap: 34,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
});
