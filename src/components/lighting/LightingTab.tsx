import React from 'react';
import type { Light } from '../../types/room';
import { LightCard } from './LightCard';

interface Props {
  lights: Light[];
}

export function LightingTab({ lights }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {lights.map(light => (
        <LightCard key={light.entity} light={light} />
      ))}
    </div>
  );
}