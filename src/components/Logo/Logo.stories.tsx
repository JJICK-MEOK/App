import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Logo/Logo',
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const Small: Story = {
  args: { width: 120, height: 124 },
};
