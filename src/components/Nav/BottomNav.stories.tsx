import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import BottomNav, { TabKey } from './BottomNav';

const meta: Meta<typeof BottomNav> = {
  title: 'Nav/BottomNav',
  component: BottomNav,
  args: {
    activeTab: 'home',
    onTabChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState<TabKey>('home');
    return (
      <View style={{ padding: 20 }}>
        <BottomNav activeTab={active} onTabChange={setActive} />
      </View>
    );
  },
};
