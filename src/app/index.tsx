import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/src/components/Logo/Logo';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

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
      {/* 배경 장식 원 */}
      <View style={[styles.ellipse, styles.ellipseTopLeft]} />
      <View style={[styles.ellipse, styles.ellipseTopRight]} />
      <View style={[styles.ellipse, styles.ellipseBottomLeft]} />
      <View style={[styles.ellipse, styles.ellipseBottomRight]} />
      <View style={[styles.ellipse, styles.ellipseCenter]} />

      <View style={styles.content}>
        <Text style={styles.subtitle}>나에게 맞는 활동을</Text>
        <Logo width={240} height={249} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ellipse: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.5,
  },
  ellipseTopLeft: {
    width: 423,
    height: 336,
    backgroundColor: colors.primary.main,
    top: -149,
    left: -166,
  },
  ellipseTopRight: {
    width: 372,
    height: 329,
    backgroundColor: colors.primary.sub,
    top: 5,
    right: -150,
  },
  ellipseBottomLeft: {
    width: 469,
    height: 305,
    backgroundColor: colors.primary.main,
    bottom: 60,
    left: -88,
  },
  ellipseBottomRight: {
    width: 372,
    height: 388,
    backgroundColor: colors.primary.sub,
    top: 317,
    right: -150,
  },
  ellipseCenter: {
    width: 222,
    height: 197,
    backgroundColor: colors.primary.light,
    top: 262,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -111,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: typography.family.base,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semiBold,
    color: colors.text.heading,
    letterSpacing: typography.letterSpacing.wide,
    marginBottom: 4,
  },
});
