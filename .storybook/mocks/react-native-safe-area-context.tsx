import React from 'react';

const defaultInsets = { top: 0, bottom: 0, left: 0, right: 0 };

export const SafeAreaProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SafeAreaView = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useSafeAreaInsets = () => defaultInsets;
export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 375, height: 812 });
export const SafeAreaInsetsContext = React.createContext(defaultInsets);
export const initialWindowMetrics = {
  insets: defaultInsets,
  frame: { x: 0, y: 0, width: 375, height: 812 },
};
