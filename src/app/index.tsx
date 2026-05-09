import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/src/components/Logo/Logo';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary.main, colors.primary.sub, colors.primary.light]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <View style={styles.circleWrapper}>
        <View style={styles.circleRow}>
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
          <View style={styles.topicImage} />
        </View>
      </View>

      <View style={styles.content}>
        <Typography size="lg" weight="semiBold" color="heading" style={styles.subtitle}>
          나에게 맞는 활동을
        </Typography>
        <Logo width={240} height={249} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  circleWrapper: {
    width: SCREEN_WIDTH,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 59,
    marginLeft: -20,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  topicImage: {
    width: 135,
    height: 135,
    borderRadius: 135,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: '#D9D9D9',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    letterSpacing: typography.letterSpacing.wide,
    marginBottom: 4,
  },
});
