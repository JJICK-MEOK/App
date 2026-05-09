import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChipFilter from './ChipFilter';

const meta: Meta<typeof ChipFilter> = {
  title: 'Chip/ChipFilter',
  component: ChipFilter,
  args: { label: '서울', onRemove: () => {} },
};

export default meta;
type Story = StoryObj<typeof ChipFilter>;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
      <ChipFilter label="서울" onRemove={() => {}} />
      <ChipFilter label="강남" onRemove={() => {}} />
      <ChipFilter label="마포" onRemove={() => {}} />
    </View>
  ),
};
