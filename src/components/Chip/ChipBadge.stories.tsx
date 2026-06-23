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
  args: { label: '#취향태그', variant: 'mood' },
};

export const Intensity: Story = {
  args: { label: '#취향태그', variant: 'intensity' },
};

export const Duration: Story = {
  args: { label: '#취향태그', variant: 'duration' },
};

export const GroupSize: Story = {
  args: { label: '#취향태그', variant: 'groupSize' },
};

export const Purpose: Story = {
  args: { label: '#취향태그', variant: 'purpose' },
};

export const MoodDark: Story = {
  args: { label: '#취향태그', variant: 'mood', dark: true },
};

export const IntensityDark: Story = {
  args: { label: '#취향태그', variant: 'intensity', dark: true },
};

export const DurationDark: Story = {
  args: { label: '#취향태그', variant: 'duration', dark: true },
};

export const GroupSizeDark: Story = {
  args: { label: '#취향태그', variant: 'groupSize', dark: true },
};

export const PurposeDark: Story = {
  args: { label: '#취향태그', variant: 'purpose', dark: true },
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
        <ChipBadge label="#취향태그" variant="mood" />
        <ChipBadge label="#취향태그" variant="intensity" />
        <ChipBadge label="#취향태그" variant="duration" />
        <ChipBadge label="#취향태그" variant="groupSize" />
        <ChipBadge label="#취향태그" variant="purpose" />
        <ChipBadge label="AD" variant="ad" />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <ChipBadge label="#취향태그" variant="mood" dark />
        <ChipBadge label="#취향태그" variant="intensity" dark />
        <ChipBadge label="#취향태그" variant="duration" dark />
        <ChipBadge label="#취향태그" variant="groupSize" dark />
        <ChipBadge label="#취향태그" variant="purpose" dark />
      </View>
    </View>
  ),
};
