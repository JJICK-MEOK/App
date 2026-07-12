import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ModalButton from './ModalButton';

const meta: Meta<typeof ModalButton> = {
  title: 'Button/ModalButton',
  component: ModalButton,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof ModalButton>;

export const Default: Story = {
  args: { label: '네', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: '아니요', variant: 'secondary' },
};

export const All: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <ModalButton label="아니요" variant="secondary" onPress={() => {}} />
      <ModalButton label="네" variant="primary" onPress={() => {}} />
    </View>
  ),
};
