'use client';

import { useState } from 'react';
import { Video, Channel } from '@/types';
import { VideoCard } from './VideoCard';
import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  channels: Channel[];
  onVideoSelect: (video: Video) => void;
  onParentModeRequest: () => void;
  selectedChannel: string | null;
  onChannelChange: (channelId: string | null) => void;
}

export function VideoGrid({
  videos,
  channels,
  onVideoSelect,
  onParentModeRequest,
  selectedChannel,
  onChannelChange,
}: VideoGridProps) {
  const filteredVideos = selectedChannel
    ? videos.filter(v => v.channelId === selectedChannel)
    : videos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b-4 border-sky-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📺</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-600">
              Kids TV
            </h1>
          </div>
          <Button
            onClick={onParentModeRequest}
            variant="outline"
            className="rounded-full px-4 py-2 text-sm font-bold border-2 border-purple-300 hover:bg-purple-50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Parents
          </Button>
        </div>
      </header>

      {/* Channel Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => onChannelChange(null)}
            variant={selectedChannel === null ? 'default' : 'outline'}
            className={`rounded-full px-6 py-3 text-base font-bold transition-all ${
              selectedChannel === null
                ? 'bg-gradient-to-r from-sky-400 to-purple-500 text-white'
                : 'bg-white border-2 border-gray-200 hover:border-sky-300'
            }`}
          >
            All Shows
          </Button>
          {channels.map(channel => (
            <Button
              key={channel.id}
              onClick={() => onChannelChange(channel.id)}
              variant={selectedChannel === channel.id ? 'default' : 'outline'}
              className={`rounded-full px-6 py-3 text-base font-bold transition-all ${
                selectedChannel === channel.id
                  ? 'text-white'
                  : 'bg-white border-2 hover:opacity-80'
              }`}
              style={{
                backgroundColor: selectedChannel === channel.id ? channel.color : undefined,
                borderColor: selectedChannel === channel.id ? channel.color : undefined,
              }}
            >
              {channel.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-600">No videos found</h2>
            <p className="text-gray-500 mt-2">Try selecting a different channel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                channel={channels.find(c => c.id === video.channelId)}
                onClick={() => onVideoSelect(video)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
