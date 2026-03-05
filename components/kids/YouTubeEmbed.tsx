'use client';

import { useEffect, useRef } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  onEnded?: () => void;
}

export function YouTubeEmbed({ videoId, onEnded }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Disable related videos and enable modest branding
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
    });

    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
    }
  }, [videoId]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Video player"
    />
  );
}
