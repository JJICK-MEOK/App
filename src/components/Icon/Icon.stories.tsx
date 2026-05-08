import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Icon/Icon',
  component: Icon,
  args: { name: 'arrowDown' },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const ArrowDown: Story = { args: { name: 'arrowDown' } };
export const Check: Story = { args: { name: 'check' } };
export const Add: Story = { args: { name: 'add' } };

export const AllIcons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Icon name="arrowDown" />
      <Icon name="check" />
      <Icon name="add" />
    </View>
  ),
};
