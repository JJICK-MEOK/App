import React from 'react';
import type { Preview, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'surface', value: '#F5F5F5' },
        { name: 'dark', value: '#222222' },
      ],
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <SafeAreaProvider>
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
};

export default preview;
