import type { Meta, StoryObj } from '@storybook/react';
import ChipAD from './ChipAD';

const meta: Meta<typeof ChipAD> = {
  title: 'Chip/ChipAD',
  component: ChipAD,
  args: { label: 'AD' },
};

export default meta;
type Story = StoryObj<typeof ChipAD>;

export const Default: Story = {};
