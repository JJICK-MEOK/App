import type { Meta, StoryObj } from '@storybook/react';
import PromotionCard from './PromotionCard';

const meta: Meta<typeof PromotionCard> = {
  title: 'Card/PromotionCard',
  component: PromotionCard,
  args: {
    days: 11,
    category: '클럽',
    title: '같이 러닝할 사람 구해요',
    subtitle: '매주 토요일 한강에서 함께해요',
  },
};

export default meta;
type Story = StoryObj<typeof PromotionCard>;

export const Default: Story = {
  args: {
    days: 11,
    category: '활동 카테고리',
    subtitle: '주최 기간',
    title: '후킹용/설명용\n프로그램 관련 멘트',
  },
};
