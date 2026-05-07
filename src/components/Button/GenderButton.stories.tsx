import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import GenderButton from './GenderButton';

const meta: Meta<typeof GenderButton> = {
  title: 'Button/GenderButton',
  component: GenderButton,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof GenderButton>;

export const Default: Story = {
  args: { label: '남성', selected: false },
};

export const Selected: Story = {
  args: { label: '남성', selected: true },
};

export const Both: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <GenderButton label="남성" selected={false} onPress={() => {}} />
      <GenderButton label="여성" selected={true} onPress={() => {}} />
    </View>
  ),
};
