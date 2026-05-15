import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChipBadge from './ChipBadge';

const meta: Meta<typeof ChipBadge> = {
  title: 'Chip/ChipBadge',
  component: ChipBadge,
  args: { label: '서울' },
};

export default meta;
type Story = StoryObj<typeof ChipBadge>;

export const ActivityCategory: Story = {
  args: {
    variant: 'preference',
    label: '#취향태그',
  },
};

export const Promotion: Story = {
  args: { variant: 'promotion' },
};

export const Preference: Story = {
  args: { variant: 'preference' },
};

export const All: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <ChipBadge label="서울" variant="activityCategory" />
      <ChipBadge label="할인중" variant="promotion" />
      <ChipBadge label="#조용한" variant="preference" />
    </View>
  ),
};
