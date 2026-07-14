import type { Meta, StoryObj } from '@storybook/react';
import LogoutModal from './LogoutModal';

const meta: Meta<typeof LogoutModal> = {
  title: 'Modal/LogoutModal',
  component: LogoutModal,
  args: {
    onCancel: () => {},
    onConfirm: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof LogoutModal>;

export const Default: Story = {};
