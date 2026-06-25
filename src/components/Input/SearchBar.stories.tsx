import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Input/SearchBar',
  component: SearchBar,
  args: {
    value: '',
    onChangeText: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    value: '홍대 드로잉 클래스',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <SearchBar value={value} onChangeText={setValue} />;
  },
};
