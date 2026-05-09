import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { LocationButton } from './LocationButton';

const meta: Meta<typeof LocationButton> = {
  title: 'Button/LocationButton',
  component: LocationButton,
  args: {
    label: '서울',
    onPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof LocationButton>;

export const Default: Story = {
  args: { position: 'middle', selected: false },
};

export const Selected: Story = {
  args: { position: 'middle', selected: true },
};

export const AllPositions: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 83 * 3 }}>
      <LocationButton label="서울" position="topLeft" selected={false} onPress={() => {}} />
      <LocationButton label="서울" position="middle" selected={false} onPress={() => {}} />
      <LocationButton label="서울" position="topRight" selected={false} onPress={() => {}} />
      <LocationButton label="서울" position="bottomLeft" selected={true} onPress={() => {}} />
      <LocationButton label="서울" position="middle" selected={true} onPress={() => {}} />
      <LocationButton label="서울" position="bottomRight" selected={true} onPress={() => {}} />
    </View>
  ),
};
