import type { Meta, StoryObj } from '@storybook/react';
import ZoomButton from './ZoomButton';

const meta: Meta<typeof ZoomButton> = {
  title: 'Button/ZoomButton',
  component: ZoomButton,
};

export default meta;
type Story = StoryObj<typeof ZoomButton>;

export const Default: Story = {
  render: () => <ZoomButton onPress={() => {}} />,
};
