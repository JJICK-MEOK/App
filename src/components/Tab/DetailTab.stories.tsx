import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DetailTab from './DetailTab';

const meta: Meta<typeof DetailTab> = {
  title: 'Tab/DetailTab',
  component: DetailTab,
};

export default meta;
type Story = StoryObj<typeof DetailTab>;

export const Interactive: Story = {
  args: {
    tabs: [
      { key: 'tab1', label: '정보' },
      { key: 'tab2', label: '후기' },
    ],
  },
  render: (args) => {
    const [activeKey, setActiveKey] = useState(args.tabs[0]?.key ?? '');
    return <DetailTab {...args} activeKey={activeKey} onTabChange={setActiveKey} />;
  },
};
