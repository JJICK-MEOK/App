import type { Meta, StoryObj } from '@storybook/react';
import { CategoryCard } from './CategoryCard';

const meta: Meta<typeof CategoryCard> = {
  title: 'Card/CategoryCard',
  component: CategoryCard,
  args: {
    categoryName: '운동 / 액티비티',
    imageUri: 'https://picsum.photos/70',
    onSubscribePress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  args: { subscribed: false, subscriberText: '12,500명이 구독했어요' },
};

export const Subscribed: Story = {
  args: { subscribed: true, subscriberText: '12,500명이 구독했어요' },
};

export const WithoutSubscriberText: Story = {
  args: { subscribed: false },
};
