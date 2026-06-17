import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BottomActionBar from './BottomActionBar';

const meta: Meta<typeof BottomActionBar> = {
  title: 'Bar/BottomActionBar',
  component: BottomActionBar,
};

export default meta;
type Story = StoryObj<typeof BottomActionBar>;

export const Interactive: Story = {
  render: () => {
    const [saved, setSaved] = useState(false);
    return (
      <BottomActionBar
        saved={saved}
        onSavePress={() => setSaved((prev) => !prev)}
        label="바로 지원하기"
        onPress={() => {}}
      />
    );
  },
};
