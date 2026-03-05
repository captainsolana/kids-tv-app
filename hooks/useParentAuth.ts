'use client';

import { useState, useEffect } from 'react';

const PIN_KEY = 'parentPin';

export function useParentAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPin, setHasPin] = useState(false);
  const [pin, setPin] = useState<string | null>(null);

  useEffect(() => {
    const savedPin = localStorage.getItem(PIN_KEY);
    setHasPin(!!savedPin);
    setPin(savedPin);
  }, []);

  const setupPin = (newPin: string) => {
    localStorage.setItem(PIN_KEY, newPin);
    setPin(newPin);
    setHasPin(true);
    setIsAuthenticated(true);
  };

  const verifyPin = (inputPin: string) => {
    if (inputPin === pin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, hasPin, setupPin, verifyPin, logout };
}
