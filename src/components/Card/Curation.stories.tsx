import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';
import Curation from './Curation';
import type { Activity } from './Curation';

// 카드는 width: 100%로 부모 기준 너비를 따르므로, 스토리에서는 데모용 고정 너비 wrapper로 감싼다.
const STORY_CARD_WIDTH = 220;

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: '[영등포문화재단] 도림생활문화센터\n2026 사계절클래스 [봄] 프로그램',
    days: 11,
    tags: [
      { label: '취향태그', type: 'MOOD' },
      { label: '취향태그', type: 'INTENSITY' },
      { label: '취향태그', type: 'SIZE' },
    ],
  },
  {
    id: '2',
    title: '[서대문구] 2026 봄 문화예술 프로그램',
    days: 5,
    tags: [
      { label: '취향태그', type: 'MOOD' },
      { label: '취향태그', type: 'DURATION' },
    ],
  },
  {
    id: '3',
    title: '[마포구] 홍대앞 창작스튜디오 오픈클래스',
    days: 20,
    tags: [{ label: '취향태그', type: 'INTENSITY' }],
  },
];

const meta: Meta<typeof Curation> = {
  title: 'Card/Curation',
  component: Curation,
  args: { activity: ACTIVITIES[0] },
  decorators: [(Story) => <View style={{ width: STORY_CARD_WIDTH }}>{Story()}</View>],
};

export default meta;
type Story = StoryObj<typeof Curation>;

/** 단일 카드 */
export const Default: Story = {};

/** 여러 카드 — 손가락으로 옆으로 미는 가로 스크롤 */
export const HorizontalScroll: Story = {
  decorators: [],
  render: () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
    >
      {ACTIVITIES.map((activity) => (
        <View key={activity.id} style={{ width: STORY_CARD_WIDTH }}>
          <Curation activity={activity} />
        </View>
      ))}
    </ScrollView>
  ),
};
