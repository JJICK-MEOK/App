import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Skeleton/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { width: '100%', height: 20 },
};

export const ContentCardSkeleton: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 13 }}>
      <Skeleton width={117} height={117} />
      <View style={{ flex: 1, gap: 8 }}>
        <Skeleton width="100%" height={16} />
        <Skeleton width="60%" height={14} />
        <Skeleton width="80%" height={14} />
      </View>
    </View>
  ),
};
