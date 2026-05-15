import { View, StyleSheet } from 'react-native';

type Props = {
  count: number;
  activeIndex: number;
};

export default function Indicator({ count, activeIndex }: Props) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), count - 1);
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) =>
        i === safeIndex ? (
          <View key={i} style={styles.active} />
        ) : (
          <View key={i} style={styles.inactive} />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  active: {
    width: 8,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#000',
  },
  inactive: {
    width: 6,
    height: 6,
    borderRadius: 100,
    backgroundColor: '#FFF',
  },
});
