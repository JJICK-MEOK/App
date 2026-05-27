import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/src/components/Logo/Logo';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={[colors.primary.main, colors.primary.sub, colors.primary.light]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
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
