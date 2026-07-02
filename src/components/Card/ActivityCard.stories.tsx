import type { Meta, StoryObj } from '@storybook/react';
import ActivityCard from './ActivityCard';

const meta: Meta<typeof ActivityCard> = {
  title: 'Card/ActivityCard',
  component: ActivityCard,
  args: {
    dday: 'D-11',
    title: '서울야외도서관 힙독클럽 2기 모집',
    tags: [
      { label: '#취향태그', variant: 'MOOD' },
      { label: '#취향태그', variant: 'INTENSITY' },
    ],
    viewCount: 240,
    likeCount: 70,
  },
};

export default meta;
type Story = StoryObj<typeof ActivityCard>;

export const Default: Story = {};

export const SingleTag: Story = {
  args: {
    tags: [{ label: '#취향태그', variant: 'MOOD' }],
  },
};

export const MultipleTagVariants: Story = {
  args: {
    title: '한강 피크닉 클럽 모집',
    tags: [
      { label: '#분위기', variant: 'MOOD' },
      { label: '#강도', variant: 'INTENSITY' },
      { label: '#시간', variant: 'DURATION' },
    ],
    viewCount: 1200,
    likeCount: 340,
  },
};
