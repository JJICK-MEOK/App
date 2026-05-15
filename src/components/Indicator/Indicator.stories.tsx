import type { Meta, StoryObj } from '@storybook/react';
import Indicator from './Indicator';

const meta: Meta<typeof Indicator> = {
  title: 'Indicator/Indicator',
  component: Indicator,
  args: { count: 3, activeIndex: 0 },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Default: Story = {};

export const Second: Story = {
  args: { activeIndex: 1 },
};

export const Third: Story = {
  args: { activeIndex: 2 },
};
