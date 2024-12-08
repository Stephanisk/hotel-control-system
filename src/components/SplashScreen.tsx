import React from 'react';
import { Clock } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

export function SplashScreen({ onEnter }: Props) {
  return (
    <div 
      className="fixed inset-0 bg-luxury-bg flex items-center justify-center cursor-pointer"
      onClick={onEnter}
    >
      <div className="text-center">
        <div className="mb-8 relative">
          <Clock className="w-24 h-24 text-luxury-accent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-transparent" />
        </div>
        <h1 className="text-4xl font-serif mb-4 text-luxury-text">
          Threads of Time
        </h1>
        <p className="text-luxury-text/70 text-lg font-medium">
          Tap anywhere to enter
        </p>
      </div>
    </div>
  );
}