import { Tabs, useSegments } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { TabKey } from '@/src/components/Nav/BottomNav';
import BottomNavigation from '@/src/components/Nav/BottomNavigation';
import { colors } from '@/src/constants/colors';

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
  const segments = useSegments();
  const isHome = segments.at(-1) === 'home';
  const edges: Edge[] = isHome ? [] : ['top'];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isHome ? 'transparent' : colors.neutral.white }}
      edges={edges}
    >
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={({ state, navigation }) => {
          const currentRoute = state.routes[state.index].name;
          const activeTab = ROUTE_TO_TAB[currentRoute] ?? 'home';

          return (
            <View style={styles.navWrapper}>
              <BottomNavigation
                activeTab={activeTab}
                onTabChange={(tab: TabKey) => navigation.navigate(TAB_TO_ROUTE[tab])}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
