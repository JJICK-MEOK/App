import type { Meta, StoryObj } from '@storybook/react';
import { ContentCard } from './ContentCard';

const meta: Meta<typeof ContentCard> = {
  title: 'Card/ContentCard',
  component: ContentCard,
  args: {
    title: '아무것도 몰라도 락스타가 될 수 있어!',
    subtitle: '201P Rookies 13기',
    imageUri: 'https://picsum.photos/117',
    tags: ['#서울 내', '#예술적', '#활기찬'],
  },
};

export default meta;
type Story = StoryObj<typeof ContentCard>;

export const Default: Story = {};

export const Pressable: Story = {
  args: { onPress: () => {} },
};

export const ManyTags: Story = {
  args: {
    tags: ['#서울 내', '#예술적', '#활기찬', '#소규모', '#주말'],
  },
};
