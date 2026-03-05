'use client';

import { useState, useEffect } from 'react';
import { Channel } from '@/types';
import contentData from '@/data/content.json';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const APPROVED_CHANNELS_KEY = 'approvedChannels';

export function ChannelManager() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [approved, setApproved] = useState<string[]>([]);

  useEffect(() => {
    setChannels(contentData.channels);
    const saved = localStorage.getItem(APPROVED_CHANNELS_KEY);
    setApproved(saved ? JSON.parse(saved) : contentData.channels.filter(c => c.approved).map(c => c.id));
  }, []);

  const toggleChannel = (channelId: string) => {
    const newApproved = approved.includes(channelId)
      ? approved.filter(id => id !== channelId)
      : [...approved, channelId];
    
    setApproved(newApproved);
    localStorage.setItem(APPROVED_CHANNELS_KEY, JSON.stringify(newApproved));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Approved Channels</h2>
      <p className="text-slate-600">Toggle channels to show/hide their videos</p>
      
      <div className="space-y-3">
        {channels.map((channel) => (
          <div 
            key={channel.id}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-lg">
                📺
              </div>
              <Label htmlFor={`channel-${channel.id}`} className="font-medium cursor-pointer">
                {channel.name}
              </Label>
            </div>
            <Switch
              id={`channel-${channel.id}`}
              checked={approved.includes(channel.id)}
              onCheckedChange={() => toggleChannel(channel.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
