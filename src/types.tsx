export type TabType = 'overview' | 'marquee' | 'new-activity' | 'history' | 'wall' | 'user' | 'settings' | 'poster';

export interface MarqueeItem {
  id: string;
  image: string;
  title: string;
  order: number;
}

export interface PosterItem {
  id: string;
  image: string;
  description: string;
  status: 'upcoming' | 'history';
}
