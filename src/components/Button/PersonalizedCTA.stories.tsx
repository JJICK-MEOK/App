import type { Meta, StoryObj } from '@storybook/react';
import PersonalizedCTA from './PersonalizedCTA';

const meta: Meta<typeof PersonalizedCTA> = {
  title: 'Button/PersonalizedCTA',
  component: PersonalizedCTA,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof PersonalizedCTA>;

export const Default: Story = {
  args: { label: '나만의 경험 탐색하기' },
};
