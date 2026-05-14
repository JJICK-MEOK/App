import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BottomNav, { TabKey } from '@/src/components/Nav/BottomNav';

const ROUTE_TO_TAB: Record<string, TabKey> = {
  home: 'home',
  category: 'category',
  custom: 'personalize',
  wishlist: 'heart',
  mypage: 'my',
};

const TAB_TO_ROUTE: Record<TabKey, string> = {
  home: 'home',
  category: 'category',
  personalize: 'custom',
  heart: 'wishlist',
  my: 'mypage',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => {
        const currentRoute = state.routes[state.index].name;
        const activeTab = ROUTE_TO_TAB[currentRoute] ?? 'home';

        return (
          <View style={styles.navWrapper}>
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => navigation.navigate(TAB_TO_ROUTE[tab])}
            />
          </View>
        );
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="category" />
      <Tabs.Screen name="custom" />
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="mypage" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navWrapper: {
    alignItems: 'center',
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
});
