import type { Meta, StoryObj } from '@storybook/react';
import TopNav from './TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Nav/TopNav',
  component: TopNav,
  args: {},
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {};
