import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChipChoice from './ChipChoice';

const meta: Meta<typeof ChipChoice> = {
  title: 'Chip/ChipChoice',
  component: ChipChoice,
  args: { label: '맛집 탐방', onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof ChipChoice>;

export const Default: Story = {
  args: { selected: false },
};

export const Selected: Story = {
  args: { selected: true },
};

export const Multiple: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <ChipChoice label="맛집 탐방" selected={true} onPress={() => {}} />
      <ChipChoice label="운동" selected={false} onPress={() => {}} />
      <ChipChoice label="독서" selected={true} onPress={() => {}} />
      <ChipChoice label="여행" selected={false} onPress={() => {}} />
    </View>
  ),
};
