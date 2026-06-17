import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

type Tab = {
  key: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  activeKey: string;
  onTabChange: (key: string) => void;
};

export default function DetailTab({ tabs, activeKey, onTabChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab.key)}
          >
            <Typography
              size="lg"
              weight="semiBold"
              style={[styles.tabText, tab.key === activeKey ? styles.activeText : styles.inactiveText]}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.indicatorRow}>
        {tabs.map((tab) => (
          <View
            key={tab.key}
            style={[styles.indicatorSlot, tab.key === activeKey && styles.activeIndicator]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
  },
  tabRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    textAlign: 'center',
  },
  activeText: {
    color: colors.text.primary,
  },
  inactiveText: {
    color: '#CCC',
  },
  indicatorRow: {
    flexDirection: 'row',
  },
  indicatorSlot: {
    flex: 1,
    height: 2,
    borderRadius: 200,
  },
  activeIndicator: {
    backgroundColor: colors.text.primary,
  },
});
