import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BottomNavigation from './BottomNavigation';
import type { TabKey } from './BottomNav';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Nav/BottomNavigation',
  component: BottomNavigation,
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<TabKey>('home');
    return <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />;
  },
};
