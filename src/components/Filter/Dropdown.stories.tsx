import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown/Dropdown',
  component: Dropdown,
  args: {
    label: '전체',
    onPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const Sort: Story = {
  args: {
    label: '추천순',
  },
};
