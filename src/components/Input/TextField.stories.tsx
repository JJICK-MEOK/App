import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Input/TextField',
  component: TextField,
  args: {
    placeholder: '이메일 주소를 입력해주세요',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helperText: '올바른 이메일 형식으로 입력해주세요' },
};

export const Focused: Story = {
  args: {
    value: 'hello@email.com',
    helperText: '올바른 이메일 형식으로 입력해주세요',
  },
};

export const Error: Story = {
  args: {
    value: 'hello@email.com',
    errorMessage: '이미 가입되어 있는 이메일이에요',
  },
};

export const ErrorFormat: Story = {
  args: {
    value: 'hello',
    errorMessage: '올바른 이메일 형식으로 입력해주세요',
  },
};
