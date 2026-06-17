import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ButtonSaved from './ButtonSaved';

const meta: Meta<typeof ButtonSaved> = {
  title: 'Button/ButtonSaved',
  component: ButtonSaved,
};

export default meta;
type Story = StoryObj<typeof ButtonSaved>;

export const Interactive: Story = {
  render: () => {
    const [saved, setSaved] = useState(false);
    return <ButtonSaved saved={saved} onPress={() => setSaved((prev) => !prev)} />;
  },
};
