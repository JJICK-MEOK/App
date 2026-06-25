import type { Meta, StoryObj } from '@storybook/react';
import AppBar from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Bar/AppBar',
  component: AppBar,
  args: { name: '00', onSearchPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {};

export const WithName: Story = {
  args: { name: '김찍먹' },
};
