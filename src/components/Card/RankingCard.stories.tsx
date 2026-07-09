import type { Meta, StoryObj } from '@storybook/react';
import RankingCard from './RankingCard';

const meta: Meta<typeof RankingCard> = {
  title: 'Card/RankingCard',
  component: RankingCard,
  args: {
    rank: 1,
    category: '클럽',
    title: '같이 러닝할 사람 구해요',
    deadline: 7,
  },
};

export default meta;
type Story = StoryObj<typeof RankingCard>;

export const Default: Story = {
  args: {
    rank: 1,
    category: '프로그램',
    title: '후킹용/설명용\n프로그램 관련 멘트',
    deadline: 7,
  },
};
