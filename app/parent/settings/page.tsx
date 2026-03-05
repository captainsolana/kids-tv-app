'use client';

import { PinLock } from '@/components/parent/PinLock';
import { ChannelManager } from '@/components/parent/ChannelManager';
import { VideoManager } from '@/components/parent/VideoManager';
import { useParentAuth } from '@/hooks/useParentAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function ParentSettings() {
  const { isAuthenticated, hasPin, setupPin, verifyPin, logout } = useParentAuth();

  if (!isAuthenticated) {
    return <PinLock hasPin={hasPin} onSetup={setupPin} onVerify={verifyPin} />;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Parent Settings</h1>
          <p className="text-slate-600">Manage what your kids can watch</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-blue-600 hover:underline">
            Back to Kids View
          </a>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Lock
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <ChannelManager />
        <hr />
        <VideoManager />
      </div>
    </main>
  );
}
