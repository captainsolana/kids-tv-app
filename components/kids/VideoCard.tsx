'use client';

import Image from 'next/image';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-200 hover:ring-4 hover:ring-blue-400 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500"
      style={{ minHeight: '180px' }}
    >
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
          {video.title}
        </h3>
        <p className="text-white/80 text-sm mt-1">{video.channel}</p>
      </div>
      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {video.duration}
      </div>
    </button>
  );
}
