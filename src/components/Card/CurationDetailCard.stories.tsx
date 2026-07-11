import type { Meta, StoryObj } from '@storybook/react';
import CurationDetailCard from './CurationDetailCard';

const meta: Meta<typeof CurationDetailCard> = {
  title: 'Card/CurationDetailCard',
  component: CurationDetailCard,
  args: {
    activityId: 1,
    category: '프로그램',
    dday: 'D-12',
    title: '제목(활동명) 제목',
    initialSaved: true,
  },
};

export default meta;
type Story = StoryObj<typeof CurationDetailCard>;

export const Default: Story = {};

export const Unsaved: Story = {
  args: {
    initialSaved: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: '서울야외도서관 힙독클럽 2기 모집',
    dday: 'D-3',
    category: '원데이',
  },
};
