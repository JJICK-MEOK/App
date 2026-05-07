import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Bar/ProgressBar',
  component: ProgressBar,
  args: { totalSteps: 4 },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Step1: Story = { args: { step: 1 } };
export const Step2: Story = { args: { step: 2 } };
export const Step3: Story = { args: { step: 3 } };
export const Step4: Story = { args: { step: 4 } };

export const AllSteps: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar step={1} totalSteps={4} />
      <ProgressBar step={2} totalSteps={4} />
      <ProgressBar step={3} totalSteps={4} />
      <ProgressBar step={4} totalSteps={4} />
    </View>
  ),
};
