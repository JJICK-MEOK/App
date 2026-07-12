import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ButtonInsight from './ButtonInsight';

const meta: Meta<typeof ButtonInsight> = {
  title: 'Button/ButtonInsight',
  component: ButtonInsight,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof ButtonInsight>;

export const Default: Story = {
  render: (args) => (
    <View style={{ width: 305 }}>
      <ButtonInsight {...args} />
    </View>
  ),
};
