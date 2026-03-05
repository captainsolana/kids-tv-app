'use client';

import { useState } from 'react';
import { Video, Channel } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface ParentSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  pin: string | null;
  hasPin: boolean;
  onSetPin: (pin: string | null) => void;
  onVerifyPin: (pin: string) => boolean;
  channels: Channel[];
  enabledChannels: string[];
  onToggleChannel: (channelId: string) => void;
  customVideos: Video[];
  onAddVideo: (video: Video) => void;
  onRemoveVideo: (videoId: string) => void;
}

export function ParentSettings({
  isOpen,
  onClose,
  pin,
  hasPin,
  onSetPin,
  onVerifyPin,
  channels,
  enabledChannels,
  onToggleChannel,
  customVideos,
  onAddVideo,
  onRemoveVideo,
}: ParentSettingsProps) {
  const [enteredPin, setEnteredPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [activeTab, setActiveTab] = useState('channels');

  // New video form state
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoChannel, setNewVideoChannel] = useState('');

  const handlePinSubmit = () => {
    if (!hasPin) {
      // First time setup - set PIN
      if (enteredPin.length >= 4) {
        onSetPin(enteredPin);
        setIsAuthenticated(true);
        setEnteredPin('');
      }
    } else {
      // Verify existing PIN
      if (onVerifyPin(enteredPin)) {
        setIsAuthenticated(true);
        setEnteredPin('');
      } else {
        alert('Incorrect PIN. Please try again.');
        setEnteredPin('');
      }
    }
  };

  const handleChangePin = () => {
    if (newPin.length >= 4) {
      onSetPin(newPin);
      setNewPin('');
      alert('PIN updated successfully!');
    }
  };

  const handleAddVideo = () => {
    // Extract YouTube ID from URL
    const youtubeIdMatch = newVideoUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/
    );

    if (!youtubeIdMatch) {
      alert('Invalid YouTube URL. Please check and try again.');
      return;
    }

    if (!newVideoTitle || !newVideoChannel) {
      alert('Please fill in all fields.');
      return;
    }

    const youtubeId = youtubeIdMatch[1];
    const newVideo: Video = {
      id: `custom-${Date.now()}`,
      title: newVideoTitle,
      youtubeId: youtubeId,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      channelId: newVideoChannel,
      description: 'Custom added video',
    };

    onAddVideo(newVideo);
    setNewVideoTitle('');
    setNewVideoUrl('');
    setNewVideoChannel('');
    alert('Video added successfully!');
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setEnteredPin('');
    setActiveTab('channels');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lock className="w-5 h-5" />
            Parent Settings
          </DialogTitle>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="py-8 space-y-4">
            <p className="text-center text-gray-600">
              {hasPin
                ? 'Enter your PIN to access parent settings'
                : 'Create a PIN to protect parent settings'}
            </p>
            <div className="flex gap-2 justify-center">
              <div className="relative">
                <Input
                  type={showPin ? 'text' : 'password'}
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="Enter PIN (4+ digits)"
                  className="w-64 text-center text-2xl tracking-widest"
                  maxLength={8}
                  onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <Button onClick={handlePinSubmit}>
                {hasPin ? 'Unlock' : 'Set PIN'}
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="videos">Add Videos</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="space-y-4">
              <p className="text-sm text-gray-500">
                Toggle channels to show or hide their videos from the main grid.
              </p>
              <div className="space-y-3">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: channel.color }}
                      />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <Switch
                      checked={enabledChannels.includes(channel.id)}
                      onCheckedChange={() => onToggleChannel(channel.id)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                <div>
                  <Label htmlFor="video-url">YouTube URL</Label>
                  <Input
                    id="video-url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <Label htmlFor="video-channel">Channel</Label>
                  <select
                    id="video-channel"
                    value={newVideoChannel}
                    onChange={(e) => setNewVideoChannel(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select a channel</option>
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button onClick={handleAddVideo} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>

              {customVideos.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Custom Videos</h3>
                  <div className="space-y-2">
                    {customVideos.map((video) => (
                      <div
                        key={video.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-gray-50"
                      >
                        <span className="truncate flex-1">{video.title}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveVideo(video.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div>
                <Label htmlFor="new-pin">Change PIN</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="new-pin"
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="New PIN (4+ digits)"
                    maxLength={8}
                  />
                  <Button onClick={handleChangePin}>Update</Button>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm('Remove PIN protection?')) {
                      onSetPin(null);
                      setIsAuthenticated(false);
                    }
                  }}
                  className="w-full"
                >
                  Remove PIN Protection
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
