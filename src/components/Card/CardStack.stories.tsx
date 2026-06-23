import type { Meta, StoryObj } from '@storybook/react';
import CardStack from './CardStack';
import type { Activity } from './SwipeCard';

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: '[영등포문화재단] 도림생활문화센터\n2026 사계절클래스 [봄] 프로그램',
    days: 11,
    tags: [
      { label: '취향태그', type: 'mood' },
      { label: '취향태그', type: 'intensity' },
      { label: '취향태그', type: 'groupSize' },
    ],
  },
  {
    id: '2',
    title: '[서대문구] 2026 봄 문화예술 프로그램',
    days: 5,
    tags: [
      { label: '취향태그', type: 'mood' },
      { label: '취향태그', type: 'duration' },
    ],
  },
  {
    id: '3',
    title: '[마포구] 홍대앞 창작스튜디오 오픈클래스',
    days: 20,
    tags: [
      { label: '취향태그', type: 'intensity' },
      { label: '취향태그', type: 'purpose' },
    ],
  },
  {
    id: '4',
    title: '[종로구] 인사동 전통문화체험 프로그램',
    days: 3,
    tags: [
      { label: '취향태그', type: 'mood' },
      { label: '취향태그', type: 'groupSize' },
    ],
  },
  {
    id: '5',
    title: '[성동구] 성수동 아트마켓 참여 프로그램',
    days: 15,
    tags: [
      { label: '취향태그', type: 'duration' },
      { label: '취향태그', type: 'purpose' },
    ],
  },
];

const meta: Meta<typeof CardStack> = {
  title: 'Card/CardStack',
  component: CardStack,
};

export default meta;
type Story = StoryObj<typeof CardStack>;

/** 여러 카드 — 좌우 슬라이드로 탐색 */
export const Default: Story = {
  args: {
    activities: ACTIVITIES,
  },
};

/** 카드 2장 — 첫 카드에 이전 카드 없음, 오른쪽에 다음 카드만 */
export const TwoCards: Story = {
  args: {
    activities: [ACTIVITIES[0], ACTIVITIES[1]],
  },
};

/** 마지막 카드만 남은 상태 — 양쪽 모두 인접 카드 없음 */
export const LastCard: Story = {
  args: {
    activities: [ACTIVITIES[0]],
  },
};
