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
      { label: '#힐링', variant: 'MOOD' },
      { label: '#단기', variant: 'DURATION' },
      { label: '#소규모', variant: 'SIZE' },
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
      { label: '#힐링', variant: 'MOOD' },
      { label: '#단기', variant: 'DURATION' },
      { label: '#소규모', variant: 'SIZE' },
      { label: '#주말', variant: 'PURPOSE' },
      { label: '#실내', variant: 'INTENSITY' },
    ],
  },
};
