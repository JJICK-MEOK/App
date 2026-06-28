import type { Meta, StoryObj } from '@storybook/react';
import RecommendationCard from './RecommendationCard';

const meta: Meta<typeof RecommendationCard> = {
  title: 'Card/RecommendationCard',
  component: RecommendationCard,
  args: {
    category: '클럽',
    title: '같이 러닝할 사람 구해요',
    hashtags: ['#힐링', '#입문'],
    deadline: 7,
  },
};

export default meta;
type Story = StoryObj<typeof RecommendationCard>;

export const Default: Story = {
  args: {
    category: '활동카테고리',
    title: '후킹용/설명용\n프로그램 관련 멘트',
    hashtags: ['#취향태그1', '#취향태그2'],
    deadline: 7,
  },
};

export const WithThumbnail: Story = {
  args: {
    category: '원데이',
    title: '도예 클래스 원데이 체험',
    hashtags: ['#배움', '#단기'],
    deadline: 3,
    thumbnailUrl: 'https://picsum.photos/151/148',
  },
};

export const ClosingSoon: Story = {
  args: {
    category: '페스티벌',
    title: '봄 음악 페스티벌',
    hashtags: ['#대규모', '#활기찬'],
    deadline: 1,
  },
};
