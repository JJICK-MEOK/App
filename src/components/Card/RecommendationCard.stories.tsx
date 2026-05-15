import type { Meta, StoryObj } from '@storybook/react';
import RecommendationCard from './RecommendationCard';

const meta: Meta<typeof RecommendationCard> = {
  title: 'Card/RecommendationCard',
  component: RecommendationCard,
  args: {
    category: '클럽',
    days: 3,
    title: '같이 러닝할 사람 구해요',
    preferences: ['러닝', '야외'],
  },
};

export default meta;
type Story = StoryObj<typeof RecommendationCard>;

export const Default: Story = {
  args: {
    days: 7,
    title: '후킹용/설명용\n프로그램 관련 멘트',
    preferences: ['#취향태그', '#취향태그'],
    category: '활동카테고리',
  },
};
