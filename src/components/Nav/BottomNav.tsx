import { StyleSheet, TouchableOpacity, View } from 'react-native';
import HomeSelected from '@/assets/images/HomeSelected.svg';
import HomeUnselected from '@/assets/images/HomeUnselected.svg';
import CategorySelected from '@/assets/images/CategorySelected.svg';
import CategoryUnselected from '@/assets/images/CategoryUnselected.svg';
import HeartSelected from '@/assets/images/HeartSelected.svg';
import HeartUnselected from '@/assets/images/HeartUnselected.svg';
import MySelected from '@/assets/images/MySelected.svg';
import MyUnselected from '@/assets/images/MyUnselected.svg';
import PersonalizeSparkle from '@/assets/images/PersonalizeSparkle.svg';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export type TabKey = 'home' | 'category' | 'personalize' | 'heart' | 'my';

type TabIconComponent = React.ComponentType<{
  width?: number;
  height?: number;
  style?: object;
}>;

type TabConfig = {
  key: TabKey;
  label: string;
  Selected: TabIconComponent;
  Unselected: TabIconComponent;
  width?: number;
  iconStyle?: { marginTop?: number; marginLeft?: number };
};

const LEFT_TABS: TabConfig[] = [
  { key: 'home', label: '홈', Selected: HomeSelected, Unselected: HomeUnselected },
  {
    key: 'category',
    label: '카테고리',
    Selected: CategorySelected,
    Unselected: CategoryUnselected,
    width: 35,
  },
];

const RIGHT_TABS: TabConfig[] = [
  {
    key: 'heart',
    label: '찜',
    Selected: HeartSelected,
    Unselected: HeartUnselected,
    iconStyle: { marginTop: 3, marginLeft: 1 },
  },
  { key: 'my', label: '마이', Selected: MySelected, Unselected: MyUnselected },
];

type Props = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

function TabButton({
  tab,
  isActive,
  onPress,
}: {
  tab: TabConfig;
  isActive: boolean;
  onPress: () => void;
}) {
  const IconComponent = isActive ? tab.Selected : tab.Unselected;
  return (
    <TouchableOpacity
      style={[styles.tabItem, tab.width ? { width: tab.width } : undefined]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent width={28} height={28} style={tab.iconStyle} />
      <Typography
        size="xs"
        weight={isActive ? 'semiBold' : 'medium'}
        color={isActive ? 'primary' : 'tertiary'}
      >
        {tab.label}
      </Typography>
    </TouchableOpacity>
  );
}

export default function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.leftGroup}>
          {LEFT_TABS.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onPress={() => onTabChange(tab.key)}
            />
          ))}
        </View>
        <View style={styles.rightGroup}>
          {RIGHT_TABS.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onPress={() => onTabChange(tab.key)}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.personalizeButton}
        onPress={() => onTabChange('personalize')}
        activeOpacity={0.7}
      >
        <PersonalizeSparkle width={28} height={28} style={{ marginLeft: 2 }} />
        <Typography size="xs" weight="medium" style={styles.personalizeLabel}>
          맞춤
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 93,
  },
  bar: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: '100%',
    height: 73,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 59,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.neutral.white,
    overflow: 'hidden',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 38,
    width: 125,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 42,
    width: 125,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  personalizeButton: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.text.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  personalizeLabel: {
    color: colors.neutral.white,
  },
});
