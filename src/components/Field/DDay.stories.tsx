import type { Meta, StoryObj } from '@storybook/react';
import DDay from './DDay';

const meta: Meta<typeof DDay> = {
  title: 'Field/DDay',
  component: DDay,
  args: { days: 3 },
};

export default meta;
type Story = StoryObj<typeof DDay>;

export const Default: Story = {};

export const Today: Story = {
  args: { days: 0 },
};

export const Past: Story = {
  args: { days: -2 },
};
