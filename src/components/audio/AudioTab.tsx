import React from 'react';
import type { Audio } from '../../types/room';
import { AudioCard } from './AudioCard';

interface Props {
  audio: Audio[];
}

export function AudioTab({ audio }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {audio.map(system => (
        <AudioCard key={system.entity} audio={system} />
      ))}
    </div>
  );
}