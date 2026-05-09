export default {
  expo: {
    name: 'JJICK-MEOK',
    slug: 'JJICK-MEOK',
    version: '1.0.0',
    scheme: 'jjick-meok',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.jjickmeok.app', //App Store 등록용 앱 고유 ID - 추후 변경
    },
    android: {
      package: 'com.jjickmeok.app', //Play Store 등록용 앱 고유 ID - 추후 변경
      predictiveBackGestureEnabled: false,
    },
    plugins: ['expo-router', 'expo-web-browser', 'expo-secure-store'],
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
      },
    },
  },
};
