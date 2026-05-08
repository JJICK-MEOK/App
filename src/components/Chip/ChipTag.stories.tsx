import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChipTag from './ChipTag';

const meta: Meta<typeof ChipTag> = {
  title: 'Chip/ChipTag',
  component: ChipTag,
  args: { label: '#서울 내' },
};

export default meta;
type Story = StoryObj<typeof ChipTag>;

export const Default: Story = {};

export const Pressable: Story = {
  args: { onPress: () => {} },
};

export const Multiple: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
      <ChipTag label="#서울 내" />
      <ChipTag label="#예술적" />
      <ChipTag label="#활기찬" />
      <ChipTag label="#소규모" />
    </View>
  ),
};
