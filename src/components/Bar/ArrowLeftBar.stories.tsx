import type { Meta, StoryObj } from '@storybook/react';
import ArrowLeftBar from './ArrowLeftBar';

const meta: Meta<typeof ArrowLeftBar> = {
  title: 'Bar/ArrowLeftBar',
  component: ArrowLeftBar,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof ArrowLeftBar>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: { title: '이메일로 로그인' },
};
