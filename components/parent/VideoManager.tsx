'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

const CUSTOM_VIDEOS_KEY = 'customVideos';

export function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideo, setNewVideo] = useState({
    title: '',
    youtubeId: '',
    channel: 'Custom',
    duration: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem(CUSTOM_VIDEOS_KEY);
    if (saved) {
      setVideos(JSON.parse(saved));
    }
  }, []);

  const saveVideos = (updated: Video[]) => {
    setVideos(updated);
    localStorage.setItem(CUSTOM_VIDEOS_KEY, JSON.stringify(updated));
  };

  const addVideo = () => {
    if (!newVideo.title || !newVideo.youtubeId) return;

    const video: Video = {
      id: `custom-${Date.now()}`,
      title: newVideo.title,
      youtubeId: newVideo.youtubeId,
      channel: newVideo.channel,
      thumbnail: `https://img.youtube.com/vi/${newVideo.youtubeId}/mqdefault.jpg`,
      duration: newVideo.duration || '?',
      category: 'entertainment',
      ageRange: [3, 8],
    };

    saveVideos([...videos, video]);
    setNewVideo({ title: '', youtubeId: '', channel: 'Custom', duration: '' });
  };

  const removeVideo = (id: string) => {
    saveVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Custom Videos</h2>
      <p className="text-slate-600">Add your own YouTube videos to the whitelist</p>

      {/* Add new video */}
      <div className="bg-slate-50 p-4 rounded-lg space-y-4">
        <h3 className="font-medium">Add New Video</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              placeholder="Video title"
            />
          </div>
          
          <div>
            <Label htmlFor="youtubeId">YouTube ID</Label>
            <Input
              id="youtubeId"
              value={newVideo.youtubeId}
              onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
              placeholder="e.g., dQw4w9WgXcQ"
            />
          </div>
          
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={newVideo.duration}
              onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
              placeholder="e.g., 5:30"
            />
          </div>
        </div>

        <Button onClick={addVideo} disabled={!newVideo.title || !newVideo.youtubeId}>
          Add Video
        </Button>
      </div>

      {/* List custom videos */}
      <div className="space-y-2">
        {videos.map((video) => (
          <div 
            key={video.id}
            className="flex items-center justify-between p-3 bg-white border rounded-lg"
          >
            <div>
              <p className="font-medium">{video.title}</p>
              <p className="text-sm text-slate-500">{video.duration}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeVideo(video.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {videos.length === 0 && (
          <p className="text-slate-400 text-center py-4">No custom videos added yet</p>
        )}
      </div>
    </div>
  );
}
