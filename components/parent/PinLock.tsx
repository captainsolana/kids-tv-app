'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PinLockProps {
  hasPin: boolean;
  onSetup: (pin: string) => void;
  onVerify: (pin: string) => boolean;
}

export function PinLock({ hasPin, onSetup, onVerify }: PinLockProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    if (!hasPin) {
      onSetup(pin);
    } else {
      const valid = onVerify(pin);
      if (!valid) {
        setError('Incorrect PIN');
        setPin('');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {hasPin ? 'Enter PIN' : 'Create Parent PIN'}
        </h1>
        <p className="text-slate-600 mb-6">
          {hasPin 
            ? 'Enter your 4-digit PIN to access settings'
            : 'Create a 4-digit PIN to protect parent settings'
          }
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            className="text-center text-2xl tracking-[0.5em] h-14"
            autoFocus
          />
          
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full h-12 text-lg">
            {hasPin ? 'Unlock' : 'Set PIN'}
          </Button>
        </form>
      </div>
    </div>
  );
}
