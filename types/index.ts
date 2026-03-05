export interface Video {
  id: string;
  title: string;
  channel: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  category: 'education' | 'entertainment' | 'music';
  ageRange: [number, number];
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  approved: boolean;
}

export interface AppSettings {
  pin: string | null;
  approvedChannels: string[];
  maxWatchTimeMinutes: number;
  autoplayNext: boolean;
}
