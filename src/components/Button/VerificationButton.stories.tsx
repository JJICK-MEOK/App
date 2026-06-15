import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import VerificationButton from './VerificationButton';

const meta: Meta<typeof VerificationButton> = {
  title: 'Button/VerificationButton',
  component: VerificationButton,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof VerificationButton>;

export const Disabled: Story = {
  args: { status: 'disabled' },
};

export const Enabled: Story = {
  args: { status: 'enabled' },
};

export const Resend: Story = {
  args: { status: 'resend' },
};

export const All: Story = {
  render: () => (
    <View style={{ gap: 8, alignItems: 'flex-start' }}>
      <VerificationButton status="disabled" onPress={() => {}} />
      <VerificationButton status="enabled" onPress={() => {}} />
      <VerificationButton status="resend" onPress={() => {}} />
    </View>
  ),
};
