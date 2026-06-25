import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Loading/Loading',
  component: Loading,
  args: { visible: true },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};

export const Hidden: Story = {
  args: { visible: false },
};
