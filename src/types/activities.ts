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

export type ActivityFavoriteResponse = {
  id: number;
  userId: number;
  activityId: number;
  createdAt: string;
};

export type HomeActivity = {
  id: number;
  title: string;
  thumbnailUrl: string;
  deadline: number;
  regionId: number;
  regionName: string;
  address: string;
  activityType: string;
  category: string;
  hashtags: string[];
  isAd: boolean;
  price: number;
  viewCount: number;
  likeCount: number;
  reviewCount: number;
  liked: boolean;
  startAt: string;
  endAt: string;
  recruitStartAt: string;
  recruitEndAt: string;
};

export type HomeUser = {
  nickname: string;
  profileImageUrl: string;
};

export type HomeData = {
  user: HomeUser;
  recommendedActivities: HomeActivity[];
  closingSoonActivities: HomeActivity[];
};

export type ActivityImage = {
  id: number;
  imageUrl: string;
  sortOrder: number;
  thumbnail: boolean;
};

export type FilterOption = {
  value: string;
  label: string;
  selected: boolean;
};

export type CategoryPageData = {
  pageTitle: string;
  selectedType: string;
  selectedCategory: string;
  selectedSort: string;
  totalCount: number;
  typeOptions: FilterOption[];
  categoryOptions: FilterOption[];
  sortOptions: FilterOption[];
  activities: HomeActivity[];
};

export type DetailActivity = {
  id: number;
  regionId: number;
  regionName: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  images: ActivityImage[];
  sourceUrl: string;
  address: string;
  organizer: string;
  contactInfo: string;
  target: string;
  startAt: string;
  endAt: string;
  recruitStartAt: string;
  recruitEndAt: string;
  deadline: number;
  price: number;
  activityType: string;
  category: string;
  hashtags: string[];
  sourceType: string;
  externalId: string;
  approvalStatus: string;
  viewCount: number;
  likeCount: number;
  reviewCount: number;
  liked: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
