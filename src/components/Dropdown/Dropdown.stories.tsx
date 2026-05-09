import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown/Dropdown',
  component: Dropdown,
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    onSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};
