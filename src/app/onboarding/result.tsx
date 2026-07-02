import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useOnboardingStore } from '@/src/store/onboardingStore';
import { ContentCard, type ContentCardTag } from '@/src/components/Card/ContentCard';
import ProgressBar from '@/src/components/Bar/ProgressBar';
import { BottomCTA } from '@/src/components/Button/BottomCTA';
import { CTAContainer } from '@/src/components/Layout/CTAContainer';
import { ScreenLayout } from '@/src/components/Layout/ScreenLayout';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

const MOCK_CARDS: { title: string; subtitle: string; imageUri: string; tags: ContentCardTag[] }[] =
  [
    {
      title: '201P 밴드\nROOKIES 프로젝트',
      subtitle: '201P Rookies 13기',
      imageUri: '',
      tags: [
        { label: '#힐링', variant: 'MOOD' },
        { label: '#단기', variant: 'DURATION' },
        { label: '#소규모', variant: 'SIZE' },
      ],
    },
    {
      title: 'ROOKIES 프로젝트',
      subtitle: '201P Rookies 13기',
      imageUri: '',
      tags: [
        { label: '#힐링', variant: 'MOOD' },
        { label: '#단기', variant: 'DURATION' },
        { label: '#소규모', variant: 'SIZE' },
      ],
    },
    {
      title: '201P 밴드\nROOKIES 프로젝트',
      subtitle: '201P Rookies 13기',
      imageUri: '',
      tags: [
        { label: '#힐링', variant: 'MOOD' },
        { label: '#단기', variant: 'DURATION' },
        { label: '#소규모', variant: 'SIZE' },
      ],
    },
  ];

export default function OnboardingResult() {
  const router = useRouter();
  const nickname = useOnboardingStore((s) => s.nickname) || '회원';

  return (
    <ScreenLayout style={styles.container}>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View style={styles.progressContainer}>
        <ProgressBar step={4} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Typography size="xxxl" weight="semiBold" style={styles.title}>
            {`${nickname}님은\n소규모・가벼운 체험형을\n선호해요`}
          </Typography>
          <Typography size="md" style={styles.subtitle}>
            나만을 위한 추천 활동을 확인하세요
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
          variant="dark"
        />
      </CTAContainer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.neutral.white },
  progressContainer: { paddingHorizontal: 20, paddingTop: 9, paddingBottom: 7 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
    gap: 47,
  },
  headerBlock: {
    gap: 10,
  },
  title: {
    lineHeight: 32,
  },
  subtitle: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  cardList: {
    gap: 13,
  },
  cta: { paddingHorizontal: 20, paddingTop: 16 },
});
