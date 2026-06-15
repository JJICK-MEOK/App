import type { Meta, StoryObj } from '@storybook/react';
import TextButton from './TextButton';

const meta: Meta<typeof TextButton> = {
  title: 'Button/TextButton',
  component: TextButton,
  args: { label: '이메일로 회원가입', onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Default: Story = {};

export const SignIn: Story = {
  args: { label: '이메일로 로그인' },
};
