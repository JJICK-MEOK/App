import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Props = {
  tabs: string[];
  selected: string;
  onSelect: (tab: string) => void;
  gap?: number;
  paddingHorizontal?: number;
};

export default function TabBar({ tabs, selected, onSelect, gap = 13, paddingHorizontal = 19 }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { gap, paddingHorizontal }]}
      >
        {tabs.map((tab) => {
          const isActive = tab === selected;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => onSelect(tab)}
            >
              <Typography
                size="lg"
                weight="semiBold"
                style={isActive ? styles.activeText : styles.inactiveText}
              >
                {tab}
              </Typography>
              <View style={[styles.indicator, isActive && styles.activeIndicator]} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    alignItems: 'flex-end',
  },
  tabItem: {
    paddingHorizontal: 2,
    gap: 8,
    alignItems: 'center',
  },
  activeText: {
    color: colors.text.primary,
  },
  inactiveText: {
    color: '#999999',
  },
  indicator: {
    height: 2.5,
    borderRadius: 200,
    alignSelf: 'stretch',
  },
  activeIndicator: {
    backgroundColor: colors.text.primary,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
});
