import type { Meta, StoryObj } from '@storybook/react';
import MatchBadge from './MatchBadge';

const meta: Meta<typeof MatchBadge> = {
  title: 'Badge/MatchBadge',
  component: MatchBadge,
  args: { percentage: 67 },
};

export default meta;
type Story = StoryObj<typeof MatchBadge>;

export const Default: Story = {};

export const HighMatch: Story = {
  args: { percentage: 95 },
};

export const LowMatch: Story = {
  args: { percentage: 32 },
};
