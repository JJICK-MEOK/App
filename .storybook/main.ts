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
      plugins: [svgr({ include: '**/*.svg' })],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '..'),
          'react-native': 'react-native-web',
        },
      },
    });
  },
};

export default config;
