import type { Meta, StoryObj } from '@storybook/react';
import ProfileBar from './ProfileBar';

const meta: Meta<typeof ProfileBar> = {
  title: 'Bar/ProfileBar',
  component: ProfileBar,
  args: { title: '프로필 설정', onClose: () => {} },
};

export default meta;
type Story = StoryObj<typeof ProfileBar>;

export const Default: Story = {};
