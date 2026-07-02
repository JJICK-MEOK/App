import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import ChipBadge from './ChipBadge';

const meta: Meta<typeof ChipBadge> = {
  title: 'Chip/ChipBadge',
  component: ChipBadge,
  args: { label: '#취향태그', onPress: undefined },
};

export default meta;
type Story = StoryObj<typeof ChipBadge>;

export const Category: Story = {
  args: { label: '프로그램', variant: 'category' },
};

export const CategoryDark: Story = {
  args: { label: '프로그램', variant: 'categoryDark' },
};

export const Mood: Story = {
  args: { label: '#취향태그', variant: 'MOOD' },
};

export const Intensity: Story = {
  args: { label: '#취향태그', variant: 'INTENSITY' },
};

export const Duration: Story = {
  args: { label: '#취향태그', variant: 'DURATION' },
};

export const GroupSize: Story = {
  args: { label: '#취향태그', variant: 'SIZE' },
};

export const Purpose: Story = {
  args: { label: '#취향태그', variant: 'PURPOSE' },
};

export const MoodDark: Story = {
  args: { label: '#취향태그', variant: 'MOOD', dark: true },
};

export const IntensityDark: Story = {
  args: { label: '#취향태그', variant: 'INTENSITY', dark: true },
};

export const DurationDark: Story = {
  args: { label: '#취향태그', variant: 'DURATION', dark: true },
};

export const GroupSizeDark: Story = {
  args: { label: '#취향태그', variant: 'SIZE', dark: true },
};

export const PurposeDark: Story = {
  args: { label: '#취향태그', variant: 'PURPOSE', dark: true },
};

export const AD: Story = {
  args: { label: 'AD', variant: 'ad' },
};

export const All: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <ChipBadge label="프로그램" variant="category" />
        <ChipBadge label="프로그램" variant="categoryDark" />
        <ChipBadge label="#취향태그" variant="MOOD" />
        <ChipBadge label="#취향태그" variant="INTENSITY" />
        <ChipBadge label="#취향태그" variant="DURATION" />
        <ChipBadge label="#취향태그" variant="SIZE" />
        <ChipBadge label="#취향태그" variant="PURPOSE" />
        <ChipBadge label="AD" variant="ad" />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <ChipBadge label="#취향태그" variant="MOOD" dark />
        <ChipBadge label="#취향태그" variant="INTENSITY" dark />
        <ChipBadge label="#취향태그" variant="DURATION" dark />
        <ChipBadge label="#취향태그" variant="SIZE" dark />
        <ChipBadge label="#취향태그" variant="PURPOSE" dark />
      </View>
    </View>
  ),
};
