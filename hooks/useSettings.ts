'use client';

import { useState, useEffect, useCallback } from 'react';
import { Video, Channel, AppSettings } from '@/types';
import { DEFAULT_CHANNELS, DEFAULT_VIDEOS } from '@/types';

const SETTINGS_KEY = 'kidstv-settings';

const defaultSettings: AppSettings = {
  pin: null,
  customVideos: [],
  enabledChannels: DEFAULT_CHANNELS.map(c => c.id),
  theme: 'light',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined' || !isLoaded) return;
    
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings, isLoaded]);

  const setPin = useCallback((pin: string | null) => {
    setSettings(prev => ({ ...prev, pin }));
  }, []);

  const verifyPin = useCallback((pin: string): boolean => {
    return settings.pin === pin;
  }, [settings.pin]);

  const hasPin = useCallback((): boolean => {
    return settings.pin !== null && settings.pin !== '';
  }, [settings.pin]);

  const addCustomVideo = useCallback((video: Video) => {
    setSettings(prev => ({
      ...prev,
      customVideos: [...prev.customVideos, video],
    }));
  }, []);

  const removeCustomVideo = useCallback((videoId: string) => {
    setSettings(prev => ({
      ...prev,
      customVideos: prev.customVideos.filter(v => v.id !== videoId),
    }));
  }, []);

  const toggleChannel = useCallback((channelId: string) => {
    setSettings(prev => ({
      ...prev,
      enabledChannels: prev.enabledChannels.includes(channelId)
        ? prev.enabledChannels.filter(id => id !== channelId)
        : [...prev.enabledChannels, channelId],
    }));
  }, []);

  const isChannelEnabled = useCallback((channelId: string): boolean => {
    return settings.enabledChannels.includes(channelId);
  }, [settings.enabledChannels]);

  const getAllVideos = useCallback((): Video[] => {
    const defaultEnabled = DEFAULT_VIDEOS.filter(
      v => settings.enabledChannels.includes(v.channelId)
    );
    return [...defaultEnabled, ...settings.customVideos];
  }, [settings.enabledChannels, settings.customVideos]);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return {
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
    resetSettings,
  };
}
