export type TagType = 'mood' | 'intensity' | 'duration' | 'groupSize' | 'purpose';

export type Tag = {
  label: string;
  type: TagType;
};

export type Activity = {
  id: string;
  title: string;
  days: number;
  tags: Tag[];
  imageUrl?: string;
};
