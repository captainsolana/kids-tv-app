'use client';

import { useState } from 'react';
import { Video } from '@/types';
import { DEFAULT_CHANNELS, DEFAULT_VIDEOS } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import { VideoGrid } from '@/components/kids/VideoGrid';
import { VideoPlayer } from '@/components/kids/VideoPlayer';
import { ParentSettings } from '@/components/kids/ParentSettings';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const {
    settings,
    isLoaded,
    setPin,
    verifyPin,
    hasPin,
    addCustomVideo,
    removeCustomVideo,
    toggleChannel,
    isChannelEnabled,
    getAllVideos,
  } = useSettings();

  // Don't render until settings are loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
        <div className="text-2xl font-bold text-gray-600">Loading...</div>
      </div>
    );
  }

  const allVideos = getAllVideos();
  const enabledChannelsList = DEFAULT_CHANNELS.filter(c =>
    isChannelEnabled(c.id)
  );

  return (
    <>
      <VideoGrid
        videos={allVideos}
        channels={enabledChannelsList}
        onVideoSelect={setSelectedVideo}
        onParentModeRequest={() => setShowSettings(true)}
        selectedChannel={selectedChannel}
        onChannelChange={setSelectedChannel}
      />

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <ParentSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        pin={settings.pin}
        hasPin={hasPin()}
        onSetPin={setPin}
        onVerifyPin={verifyPin}
        channels={DEFAULT_CHANNELS}
        enabledChannels={settings.enabledChannels}
        onToggleChannel={toggleChannel}
        customVideos={settings.customVideos}
        onAddVideo={addCustomVideo}
        onRemoveVideo={removeCustomVideo}
      />
    </>
  );
}
