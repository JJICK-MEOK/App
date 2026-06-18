import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import IconHeart from './IconHeart';

const meta: Meta<typeof IconHeart> = {
  title: 'Icon/IconHeart',
  component: IconHeart,
  args: { size: 29 },
};

export default meta;
type Story = StoryObj<typeof IconHeart>;

export const Default: Story = {};

export const Saved: Story = {
  args: { saved: true },
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <IconHeart size={29} />
      <IconHeart size={29} saved />
    </View>
  ),
};
