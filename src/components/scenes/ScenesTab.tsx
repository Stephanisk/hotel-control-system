import React from 'react';
import type { Scene } from '../../types/room';
import { SceneCard } from './SceneCard';

interface Props {
  scenes: Scene[];
}

export function ScenesTab({ scenes }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {scenes.map(scene => (
        <SceneCard key={scene.entity} scene={scene} />
      ))}
    </div>
  );
}