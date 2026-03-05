'use client';

import { useState } from 'react';
import { VideoGrid } from '@/components/kids/VideoGrid';
import { VideoPlayer } from '@/components/kids/VideoPlayer';
import { useContent } from '@/hooks/useContent';
import { Video } from '@/types';

export default function KidsHome() {
  const { videos } = useContent();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Kids TV</h1>
        <a 
          href="/parent/settings" 
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Parent Settings
        </a>
      </header>
      
      <VideoGrid 
        videos={videos} 
        onVideoSelect={setSelectedVideo} 
      />
      
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </main>
  );
}
