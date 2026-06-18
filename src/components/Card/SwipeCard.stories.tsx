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

/** Front (scale=1.0) — 애니메이션 그라디언트 테두리 포함 */
export const Front: Story = {};

/** Middle (scale=0.9) */
export const Middle: Story = {
  args: { scale: 0.9 },
};

/** Back (scale=0.81) */
export const Back: Story = {
  args: { scale: 0.81 },
};

/** 찜 완료 상태 */
export const Saved: Story = {
  args: { saved: true },
};

/** 피그마 3개 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: 'flex-start' }}>
      <SwipeCard activity={DUMMY} scale={1} />
      <SwipeCard activity={DUMMY} scale={0.9} />
      <SwipeCard activity={DUMMY} scale={0.81} />
    </View>
  ),
};
