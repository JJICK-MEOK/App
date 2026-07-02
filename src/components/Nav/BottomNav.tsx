import { StyleSheet, TouchableOpacity, View } from 'react-native';
import HomeSelected from '@/assets/images/HomeSelected.svg';
import HomeUnselected from '@/assets/images/HomeUnselected.svg';
import CategorySelected from '@/assets/images/CategorySelected.svg';
import CategoryUnselected from '@/assets/images/CategoryUnselected.svg';
import PersonalizeSelected from '@/assets/images/PersonalizeSelected.svg';
import PersonalizeUnselected from '@/assets/images/PersonalizeUnselected.svg';
import HeartSelected from '@/assets/images/HeartSelected.svg';
import HeartUnselected from '@/assets/images/HeartUnselected.svg';
import MySelected from '@/assets/images/MySelected.svg';
import MyUnselected from '@/assets/images/MyUnselected.svg';
import { Typography } from '@/src/components/Typography/Typography';
import { colors } from '@/src/constants/colors';

export type TabKey = 'home' | 'category' | 'personalize' | 'heart' | 'my';

type TabIconComponent = React.ComponentType<{ width?: number; height?: number }>;

type TabConfig = {
  key: TabKey;
  label: string;
  Selected: TabIconComponent;
  Unselected: TabIconComponent;
};

const TABS: TabConfig[] = [
  { key: 'home', label: '홈', Selected: HomeSelected, Unselected: HomeUnselected },
  {
    key: 'category',
    label: '카테고리',
    Selected: CategorySelected,
    Unselected: CategoryUnselected,
  },
  {
    key: 'personalize',
    label: '맞춤',
    Selected: PersonalizeSelected,
    Unselected: PersonalizeUnselected,
  },
  { key: 'heart', label: '찜', Selected: HeartSelected, Unselected: HeartUnselected },
  { key: 'my', label: '마이', Selected: MySelected, Unselected: MyUnselected },
];

type Props = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export default function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map(({ key, label, Selected, Unselected }) => {
        const isActive = activeTab === key;
        const IconComponent = isActive ? Selected : Unselected;
        return (
          <TouchableOpacity
            key={key}
            style={styles.tabItem}
            onPress={() => onTabChange(key)}
            activeOpacity={0.7}
          >
            <View style={key === 'personalize' && styles.personalizeIconOffset}>
              <IconComponent width={28} height={28} />
            </View>
            <Typography size="xs" style={isActive ? styles.labelActive : styles.labelInactive}>
              {label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 76,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.neutral.white,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 3,
  },
  labelActive: {
    color: colors.text.primary,
    textAlign: 'center',
  },
  labelInactive: {
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  personalizeIconOffset: {
    marginLeft: 2.5,
  },
});
