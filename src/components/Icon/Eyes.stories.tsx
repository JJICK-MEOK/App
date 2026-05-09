import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Eyes from './Eyes';

const meta: Meta<typeof Eyes> = {
  title: 'Icon/Eyes',
  component: Eyes,
  args: { visible: true },
};

export default meta;
type Story = StoryObj<typeof Eyes>;

export const Visible: Story = { args: { visible: true } };
export const Hidden: Story = { args: { visible: false } };

export const Both: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Eyes visible={true} />
      <Eyes visible={false} />
    </View>
  ),
};
