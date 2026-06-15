import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChipType from './ChipType';

const meta: Meta<typeof ChipType> = {
  title: 'Chip/ChipType',
  component: ChipType,
  args: { label: '편안한', onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof ChipType>;

export const Default: Story = {
  args: { selected: false },
};

export const Selected: Story = {
  args: { selected: true },
};

export const Multiple: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <ChipType label="편안한" selected={true} onPress={() => {}} />
      <ChipType label="활기찬" selected={false} onPress={() => {}} />
      <ChipType label="로맨틱한" selected={true} onPress={() => {}} />
      <ChipType label="조용한" selected={false} onPress={() => {}} />
    </View>
  ),
};
