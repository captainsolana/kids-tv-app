'use client';

import { useState, useEffect } from 'react';
import { Video, Channel } from '@/types';
import contentData from '@/data/content.json';

const CUSTOM_VIDEOS_KEY = 'customVideos';
const APPROVED_CHANNELS_KEY = 'approvedChannels';

export function useContent() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [approvedChannels, setApprovedChannels] = useState<string[]>([]);

  useEffect(() => {
    // Load approved channels
    const savedApproved = localStorage.getItem(APPROVED_CHANNELS_KEY);
    const approved = savedApproved 
      ? JSON.parse(savedApproved) 
      : contentData.channels.filter(c => c.approved).map(c => c.id);
    
    setApprovedChannels(approved);
    setChannels(contentData.channels);
    
    // Load built-in videos filtered by approved channels
    const approvedChannelNames = approved.map((chId: string) => {
      const ch = contentData.channels.find(c => c.id === chId);
      return ch?.name;
    }).filter(Boolean);
    
    const builtinVideos = contentData.videos.filter(v => 
      approvedChannelNames.includes(v.channel)
    );
    
    // Load custom videos
    const savedCustom = localStorage.getItem(CUSTOM_VIDEOS_KEY);
    const customVideos = savedCustom ? JSON.parse(savedCustom) : [];
    
    // Merge and set
    setVideos([...builtinVideos, ...customVideos]);
  }, []);

  return { videos, channels, approvedChannels };
}
