import type { Meta, StoryObj } from '@storybook/react';
import CategoryFilter from './CategoryFilter';

const CATEGORY_OPTIONS = [
  '전체',
  '운동/액티비티',
  '문화/공연',
  '공예/만들기',
  '댄스/무용',
  '요리/베이킹',
  '사진/영상',
  '음악/악기',
  '인문학/책/글',
  '여행/산책/탐방',
  '해외/언어',
  '봉사활동',
  '자기계발/클래스',
  '커리어/실무',
  '기타',
];

const SORT_OPTIONS = ['추천순', '인기순', '마감순'];

const meta: Meta<typeof CategoryFilter> = {
  title: 'Modal/CategoryFilter',
  component: CategoryFilter,
  args: {
    onSelect: () => {},
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof CategoryFilter>;

export const Category: Story = {
  args: {
    title: '활동 분야 선택',
    options: CATEGORY_OPTIONS,
    selected: '전체',
    height: 428,
  },
};

export const Sort: Story = {
  args: {
    title: '정렬',
    options: SORT_OPTIONS,
    selected: '추천순',
    height: 322,
  },
};
