'use client';

import { VideoCard } from './VideoCard';
import { Video } from '@/types';

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-xl">
        No videos available. Ask a parent to add some!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoSelect(video)}
        />
      ))}
    </div>
  );
}
