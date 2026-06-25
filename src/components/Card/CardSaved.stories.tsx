import type { Meta, StoryObj } from '@storybook/react';
import CardSaved from './CardSaved';

const meta: Meta<typeof CardSaved> = {
  title: 'Card/CardSaved',
  component: CardSaved,
  args: {
    dday: 'D-12',
    title: '제목(활동명) 제목',
    tags: [
      { label: '#취향태그', variant: 'mood' },
      { label: '#취향태그', variant: 'intensity' },
    ],
    initialSaved: true,
  },
};

export default meta;
type Story = StoryObj<typeof CardSaved>;

export const Default: Story = {};

export const Unsaved: Story = {
  args: {
    initialSaved: false,
  },
};

export const SingleTag: Story = {
  args: {
    tags: [{ label: '#취향태그', variant: 'mood' }],
  },
};

export const LongTitle: Story = {
  args: {
    title: '서울야외도서관 힙독클럽 2기 모집',
    dday: 'D-3',
  },
};
