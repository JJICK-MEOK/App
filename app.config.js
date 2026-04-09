export default {
  expo: {
    name: 'JJICK-MEOK',
    slug: 'JJICK-MEOK',
    version: '1.0.0',
    scheme: 'jjick-meok',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.jjickmeok.app', //App Store 등록용 앱 고유 ID - 추후 변경
    },
    android: {
      package: 'com.jjickmeok.app', //Play Store 등록용 앱 고유 ID - 추후 변경
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-router', 'expo-web-browser', 'expo-secure-store'],
    extra: {
      eas: {
        projectId: '1a606ff9-09bc-4dd1-9121-8a8d7ca1572f',
      },
    },
  },
};
