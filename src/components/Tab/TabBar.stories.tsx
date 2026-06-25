import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TabBar from './TabBar';

const TABS = ['전체', '운동/액티비티', '문화/예술', '공예/만들기', '요리/베이킹', '사진/영상', '책/글', '여행/탐방', '언어/해외', '봉사활동', '성장/커리어'];

const meta: Meta<typeof TabBar> = {
  title: 'Tab/TabBar',
  component: TabBar,
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const Interactive: Story = {
  args: { tabs: TABS },
  render: (args) => {
    const [selected, setSelected] = useState(args.tabs[0] ?? '');
    return <TabBar {...args} selected={selected} onSelect={setSelected} />;
  },
};
