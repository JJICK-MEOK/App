export type TagType = 'MOOD' | 'INTENSITY' | 'DURATION' | 'SIZE' | 'PURPOSE';

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
