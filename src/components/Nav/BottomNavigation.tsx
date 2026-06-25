import { View, StyleSheet } from 'react-native';
import BottomNav, { type TabKey } from './BottomNav';

type Props = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  transparent?: boolean;
};

export default function BottomNavigation({ activeTab, onTabChange, transparent = false }: Props) {
  return (
    <View style={[styles.container, transparent && styles.containerTransparent]}>
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  containerTransparent: {
    backgroundColor: 'transparent',
  },
});
