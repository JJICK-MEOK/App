import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import SocialLoginButton from './SocialLoginButton';

const meta: Meta<typeof SocialLoginButton> = {
  title: 'Button/SocialLoginButton',
  component: SocialLoginButton,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof SocialLoginButton>;

export const Google: Story = {
  args: { provider: 'google' },
};

export const Kakao: Story = {
  args: { provider: 'kakao' },
};

export const Naver: Story = {
  args: { provider: 'naver' },
};

export const AllProviders: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <SocialLoginButton provider="google" onPress={() => {}} />
      <SocialLoginButton provider="kakao" onPress={() => {}} />
      <SocialLoginButton provider="naver" onPress={() => {}} />
    </View>
  ),
};
