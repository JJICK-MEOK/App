import type { Meta, StoryObj } from '@storybook/react';
import { ContentCard } from './ContentCard';

const meta: Meta<typeof ContentCard> = {
  title: 'Card/ContentCard',
  component: ContentCard,
  args: {
    title: '201P 밴드\nROOKIES 프로젝트',
    subtitle: '201P Rookies 13기',
    imageUri: 'https://picsum.photos/105',
    tags: [
      { label: '#힐링', variant: 'mood' },
      { label: '#단기', variant: 'duration' },
      { label: '#소규모', variant: 'groupSize' },
    ],
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
    tags: [
      { label: '#힐링', variant: 'mood' },
      { label: '#단기', variant: 'duration' },
      { label: '#소규모', variant: 'groupSize' },
      { label: '#주말', variant: 'purpose' },
      { label: '#실내', variant: 'intensity' },
    ],
  },
};
