export type TabType = 'overview' | 'marquee' | 'photoMangement' | 'history' | 'banner' | 'user' | 'settings' | 'poster' | 'program'|'photo';

export interface MarqueeItem {
  id: string;
  image: string;
  title: string;
  order: number;
}

export interface ProgramItem {
  id: string;
  image: string;
  title: string;
  content:string;
  note:string;
  order: number;
}

export interface PosterItem {
  id: string;
  image: string;
  description: string;
  status: 'upcoming' | 'history';
}

export interface ImgItem {
  id: string;
  image: string;
  type: string;
  title: string;
  order: number;
}
