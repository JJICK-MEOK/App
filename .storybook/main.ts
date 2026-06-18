import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config) {
    return mergeConfig(config, {
      define: {
        __DEV__: true,
      },
      plugins: [svgr({ include: '**/*.svg' })],
      esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'react',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '..'),
          'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(
            __dirname,
            './mocks/codegenNativeComponent.ts',
          ),
          'react-native': path.resolve(__dirname, './mocks/react-native.ts'),
          'expo-haptics': path.resolve(__dirname, './mocks/expo-haptics.ts'),
          'react-native-safe-area-context': path.resolve(
            __dirname,
            './mocks/react-native-safe-area-context.tsx',
          ),
          'expo-linear-gradient': path.resolve(
            __dirname,
            './mocks/expo-linear-gradient.tsx',
          ),
          'react-native-reanimated': path.resolve(
            __dirname,
            './mocks/react-native-reanimated.ts',
          ),
          'react-native-gesture-handler': path.resolve(
            __dirname,
            './mocks/react-native-gesture-handler.tsx',
          ),
        },
      },
    });
  },
};

export default config;
