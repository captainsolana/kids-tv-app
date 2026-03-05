export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  channelId: string;
  duration?: string;
  description?: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  color: string;
  isDefault: boolean;
}

export interface AppSettings {
  pin: string | null;
  customVideos: Video[];
  enabledChannels: string[];
  theme: 'light' | 'dark';
}

export const DEFAULT_CHANNELS: Channel[] = [
  {
    id: 'pbs-kids',
    name: 'PBS Kids',
    logo: '/logos/pbs-kids.png',
    color: '#00B5E2',
    isDefault: true,
  },
  {
    id: 'super-simple',
    name: 'Super Simple Songs',
    logo: '/logos/super-simple.png',
    color: '#FF6B35',
    isDefault: true,
  },
  {
    id: 'blippi',
    name: 'Blippi',
    logo: '/logos/blippi.png',
    color: '#47C757',
    isDefault: true,
  },
  {
    id: 'cocomelon',
    name: 'Cocomelon',
    logo: '/logos/cocomelon.png',
    color: '#FF6B9D',
    isDefault: true,
  },
];

export const DEFAULT_VIDEOS: Video[] = [
  // PBS Kids
  {
    id: 'pbs-1',
    title: 'Daniel Tiger\'s Neighborhood - Full Episode',
    youtubeId: '8eH4Yh0NrzM',
    thumbnail: 'https://img.youtube.com/vi/8eH4Yh0NrzM/maxresdefault.jpg',
    channelId: 'pbs-kids',
    description: 'Learn about feelings with Daniel Tiger',
  },
  {
    id: 'pbs-2',
    title: 'Wild Kratts - Animal Adventures',
    youtubeId: 'dG7V9E3f9qA',
    thumbnail: 'https://img.youtube.com/vi/dG7V9E3f9qA/maxresdefault.jpg',
    channelId: 'pbs-kids',
    description: 'Explore amazing animals with the Kratt brothers',
  },
  {
    id: 'pbs-3',
    title: 'Arthur - Friendship Stories',
    youtubeId: 'xJm9l9v8qXw',
    thumbnail: 'https://img.youtube.com/vi/xJm9l9v8qXw/maxresdefault.jpg',
    channelId: 'pbs-kids',
    description: 'Arthur and friends learn important lessons',
  },
  // Super Simple Songs
  {
    id: 'sss-1',
    title: 'Baby Shark',
    youtubeId: '020g-0hhCAU',
    thumbnail: 'https://img.youtube.com/vi/020g-0hhCAU/maxresdefault.jpg',
    channelId: 'super-simple',
    description: 'The classic baby shark song',
  },
  {
    id: 'sss-2',
    title: 'Twinkle Twinkle Little Star',
    youtubeId: 'yCjJyiqpAuU',
    thumbnail: 'https://img.youtube.com/vi/yCjJyiqpAuU/maxresdefault.jpg',
    channelId: 'super-simple',
    description: 'Gentle bedtime lullaby',
  },
  {
    id: 'sss-3',
    title: 'Wheels on the Bus',
    youtubeId: 'oJtgA0zDMew',
    thumbnail: 'https://img.youtube.com/vi/oJtgA0zDMew/maxresdefault.jpg',
    channelId: 'super-simple',
    description: 'Sing along to this fun action song',
  },
  // Blippi
  {
    id: 'blippi-1',
    title: 'Blippi Explores a Fire Truck',
    youtubeId: '5qm8PH4xAss',
    thumbnail: 'https://img.youtube.com/vi/5qm8PH4xAss/maxresdefault.jpg',
    channelId: 'blippi',
    description: 'Learn about fire trucks with Blippi',
  },
  {
    id: 'blippi-2',
    title: 'Blippi at the Aquarium',
    youtubeId: 'K4zm30yeHHE',
    thumbnail: 'https://img.youtube.com/vi/K4zm30yeHHE/maxresdefault.jpg',
    channelId: 'blippi',
    description: 'Discover sea creatures at the aquarium',
  },
  {
    id: 'blippi-3',
    title: 'Blippi Visits a Farm',
    youtubeId: '3QFTlkF8mFo',
    thumbnail: 'https://img.youtube.com/vi/3QFTlkF8mFo/maxresdefault.jpg',
    channelId: 'blippi',
    description: 'Meet farm animals with Blippi',
  },
  // Cocomelon
  {
    id: 'coco-1',
    title: 'Yes Yes Vegetables Song',
    youtubeId: 'y6GaPkkGZGw',
    thumbnail: 'https://img.youtube.com/vi/y6GaPkkGZGw/maxresdefault.jpg',
    channelId: 'cocomelon',
    description: 'Learn to love vegetables!',
  },
  {
    id: 'coco-2',
    title: 'Bath Song',
    youtubeId: 'WRVsOCh907o',
    thumbnail: 'https://img.youtube.com/vi/WRVsOCh907o/maxresdefault.jpg',
    channelId: 'cocomelon',
    description: 'Make bath time fun',
  },
  {
    id: 'coco-3',
    title: 'ABC Song',
    youtubeId: '_UR-l3QI2nE',
    thumbnail: 'https://img.youtube.com/vi/_UR-l3QI2nE/maxresdefault.jpg',
    channelId: 'cocomelon',
    description: 'Learn the alphabet',
  },
];
