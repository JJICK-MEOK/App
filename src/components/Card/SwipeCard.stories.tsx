import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import SwipeCard from './SwipeCard';
import type { Activity } from './SwipeCard';

const DUMMY: Activity = {
  id: '1',
  title: '[영등포문화재단] 도림생활문화센터\n2026 사계절클래스 [봄] 프로그램',
  days: 11,
  tags: [
    { label: '취향태그', type: 'mood' },
    { label: '취향태그', type: 'intensity' },
    { label: '취향태그', type: 'groupSize' },
  ],
};

const meta: Meta<typeof SwipeCard> = {
  title: 'Card/SwipeCard',
  component: SwipeCard,
  args: { activity: DUMMY },
};

export default meta;
type Story = StoryObj<typeof SwipeCard>;

/** Front — 애니메이션 그라디언트 테두리, dark 태그 */
export const Front: Story = {
  args: { isFront: true },
};

/** Back — light 태그 */
export const Back: Story = {};

/** 찜 완료 상태 */
export const Saved: Story = {
  args: { isFront: true, saved: true },
};

/** front / back 비교 */
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'flex-start' }}>
      <SwipeCard activity={DUMMY} isFront />
      <SwipeCard activity={DUMMY} />
    </View>
  ),
};
