import type { Meta, StoryObj } from '@storybook/react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';
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
  args: { helperText: '영문, 숫자, 특수문자를 포함하여 8~20자리까지 입력해 주세요' },
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

export const Password: Story = {
  args: {
    placeholder: '비밀번호를 입력해주세요',
    secureText: true,
  },
};

export const PasswordError: Story = {
  args: {
    placeholder: '비밀번호를 입력해주세요',
    secureText: true,
    errorMessage: '비밀번호가 올바르지 않아요',
  },
};

export const WithTimer: Story = {
  args: {
    placeholder: '인증번호 6자리를 입력해주세요',
    rightElement: (
      <Text
        style={{
          fontFamily: typography.family.base,
          fontSize: typography.size.sm,
          fontWeight: typography.weight.medium,
          color: colors.text.error,
        }}
      >
        3:00
      </Text>
    ),
  },
};

export const WithVerifyButton: Story = {
  args: {
    placeholder: 'user@example.com',
    rightElement: (
      <Pressable>
        <View
          style={{
            backgroundColor: colors.border.light,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontFamily: typography.family.base,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              color: colors.text.tertiary,
            }}
          >
            인증하기
          </Text>
        </View>
      </Pressable>
    ),
  },
};
