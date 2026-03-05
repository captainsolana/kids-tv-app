'use client';

import { useEffect, useCallback } from 'react';
import { Video } from '@/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  // Handle escape key to close player
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when player is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // YouTube privacy-enhanced embed URL (no cookies, no tracking)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
        <h2 className="text-white font-bold text-lg truncate pr-4">
          {video.title}
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-800 shrink-0"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="w-full h-full max-w-[1920px] max-h-[1080px]">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* Footer with instructions */}
      <div className="px-4 py-3 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">
          Press ESC or click the X button to go back
        </p>
      </div>
    </div>
  );
}
