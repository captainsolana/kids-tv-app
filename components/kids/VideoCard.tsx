'use client';

import { Video, Channel } from '@/types';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface VideoCardProps {
  video: Video;
  channel: Channel | undefined;
  onClick: () => void;
}

export function VideoCard({ video, channel, onClick }: VideoCardProps) {
  return (
    <Card
      onClick={onClick}
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl border-4 border-transparent hover:border-sky-400"
      style={{ borderRadius: '1rem' }}
    >
      <div className="relative aspect-video bg-gray-100">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {channel && (
          <div
            className="absolute top-2 left-2 px-3 py-1 rounded-full text-white text-sm font-bold"
            style={{ backgroundColor: channel.color }}
          >
            {channel.name}
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {video.description}
          </p>
        )}
      </div>
    </Card>
  );
}
