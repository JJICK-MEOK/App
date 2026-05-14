import type { Meta, StoryObj } from '@storybook/react';
import PersonalizeButton from './PersonalizeButton';

const meta: Meta<typeof PersonalizeButton> = {
  title: 'Button/PersonalizeButton',
  component: PersonalizeButton,
  args: { onPress: () => {} },
};

export default meta;
type Story = StoryObj<typeof PersonalizeButton>;

export const Default: Story = {
  args: { label: '버튼 텍스트' },
};
