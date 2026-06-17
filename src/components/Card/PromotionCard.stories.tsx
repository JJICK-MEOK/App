import type { Meta, StoryObj } from '@storybook/react';
import PromotionCard from './PromotionCard';

const meta: Meta<typeof PromotionCard> = {
  title: 'Card/PromotionCard',
  component: PromotionCard,
  args: {
    category: '클럽',
    title: '같이 러닝할 사람 구해요',
  },
};

export default meta;
type Story = StoryObj<typeof PromotionCard>;

export const Default: Story = {
  args: {
    category: '프로그램',
    title: '후킹용/설명용\n프로그램 관련 멘트',
  },
};
