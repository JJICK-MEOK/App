import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from './SelectField';

const OPTIONS = [
  '대학생이에요',
  '직장인이에요',
  '취업/진로를 준비 중이에요',
  '프리랜서/자유롭게 일하고 있어요',
  '기타',
];

const meta: Meta<typeof SelectField> = {
  title: 'Input/SelectField',
  component: SelectField,
  args: {
    options: OPTIONS,
    placeholder: '대학생이에요',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const Collapsed: Story = {};

export const WithValue: Story = {
  args: { value: '직장인이에요' },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <SelectField {...args} value={value} onChange={setValue} />;
  },
};
