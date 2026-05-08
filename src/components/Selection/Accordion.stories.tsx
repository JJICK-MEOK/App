import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const SEOUL_DISTRICTS = [
  '서울전체',
  '강남',
  '강동',
  '강북',
  '강서',
  '관악',
  '광진',
  '구로',
  '금천',
  '노원',
  '도봉',
  '동대문',
  '동작',
  '마포',
  '서대문',
  '서초',
  '성동',
  '성북',
  '송파',
  '양천',
  '영등포',
  '용산',
  '은평',
  '종로',
  '중구',
  '중랑',
];

const meta: Meta<typeof Accordion> = {
  title: 'Selection/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Collapsed: Story = {
  render: () => (
    <Accordion
      city="서울"
      position="topLeft"
      districts={SEOUL_DISTRICTS}
      expanded={false}
      onToggle={() => {}}
      onDistrictToggle={() => {}}
    />
  ),
};

export const Expanded: Story = {
  render: () => (
    <Accordion
      city="서울"
      position="topLeft"
      districts={SEOUL_DISTRICTS}
      expanded={true}
      selectedDistricts={['강남', '마포']}
      onToggle={() => {}}
      onDistrictToggle={() => {}}
    />
  ),
};

function InteractiveTemplate() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleDistrictToggle = (district: string) => {
    setSelected((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district],
    );
  };

  return (
    <Accordion
      city="서울"
      position="topLeft"
      districts={SEOUL_DISTRICTS}
      expanded={expanded}
      selectedDistricts={selected}
      onToggle={() => setExpanded((prev) => !prev)}
      onDistrictToggle={handleDistrictToggle}
    />
  );
}

export const Interactive: Story = { render: InteractiveTemplate };
