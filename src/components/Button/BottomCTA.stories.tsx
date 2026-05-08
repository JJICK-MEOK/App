import type { Meta, StoryObj } from '@storybook/react';
import { BottomCTA } from './BottomCTA';

const meta: Meta<typeof BottomCTA> = {
  title: 'Button/BottomCTA',
  component: BottomCTA,
  args: {
    label: '다음',
    onPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof BottomCTA>;

export const White: Story = {
  args: { variant: 'white', label: '이메일로 시작하기' },
};

export const Primary: Story = {
  args: { variant: 'primary', label: '다음' },
};

export const Dark: Story = {
  args: { variant: 'dark', label: '로그인' },
};

export const Disabled: Story = {
  args: { disabled: true, label: '다음' },
};
