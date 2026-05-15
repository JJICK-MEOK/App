import React from 'react';
import type { Preview, StoryFn } from '@storybook/react';
import { View } from 'react-native';

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
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;
