import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Icon/Checkbox',
  component: Checkbox,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = { args: { checked: false } };
export const Checked: Story = { args: { checked: true } };
