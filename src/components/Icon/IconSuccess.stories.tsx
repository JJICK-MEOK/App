import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import IconSuccess from './IconSuccess';

const meta: Meta<typeof IconSuccess> = {
  title: 'Icon/IconSuccess',
  component: IconSuccess,
  args: { size: 71 },
};

export default meta;
type Story = StoryObj<typeof IconSuccess>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 45 },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <IconSuccess size={45} />
      <IconSuccess size={71} />
    </View>
  ),
};
