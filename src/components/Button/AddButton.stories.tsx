import type { Meta, StoryObj } from '@storybook/react';
import AddButton from './AddButton';

const meta: Meta<typeof AddButton> = {
  title: 'Button/AddButton',
  component: AddButton,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Default: Story = {
  args: { selected: false },
};

export const Selected: Story = {
  args: { selected: true },
};
