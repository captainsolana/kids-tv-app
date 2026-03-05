'use client';

import { X } from 'lucide-react';
import { Video } from '@/types';
import { YouTubeEmbed } from './YouTubeEmbed';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
        <h2 className="text-white font-semibold truncate pr-4">
          {video.title}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-slate-800 shrink-0"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Video */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl aspect-video">
          <YouTubeEmbed videoId={video.youtubeId} />
        </div>
      </div>
      
      {/* Footer info */}
      <div className="px-4 py-3 bg-slate-900 text-white/70 text-sm">
        {video.channel} • {video.duration}
      </div>
    </div>
  );
}
