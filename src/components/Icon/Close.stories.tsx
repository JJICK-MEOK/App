import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Close from './Close';

const meta: Meta<typeof Close> = {
  title: 'Icon/Close',
  component: Close,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof Close>;

export const Medium: Story = { args: { variant: 'md' } };
export const Small: Story = { args: { variant: 'sm' } };

export const Both: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Close variant="md" onPress={() => {}} />
      <Close variant="sm" onPress={() => {}} />
    </View>
  ),
};
