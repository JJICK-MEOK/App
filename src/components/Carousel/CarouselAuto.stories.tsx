import type { Meta, StoryObj } from '@storybook/react';
import CarouselAuto from './CarouselAuto';

const meta: Meta<typeof CarouselAuto> = {
  title: 'Carousel/CarouselAuto',
  component: CarouselAuto,
};

export default meta;
type Story = StoryObj<typeof CarouselAuto>;

export const Placeholder: Story = {};

export const WithImages: Story = {
  args: {
    images: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=136&h=136&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=136&h=136&fit=crop',
      'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=136&h=136&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c4fe1fa7?w=136&h=136&fit=crop',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=136&h=136&fit=crop',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=136&h=136&fit=crop',
    ],
  },
};
