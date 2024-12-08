import React from 'react';
import type { Climate } from '../../types/room';
import { ClimateCard } from './ClimateCard';

interface Props {
  climate: Climate[];
}

export function ClimateTab({ climate }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {climate.map(unit => (
        <ClimateCard key={unit.entity} climate={unit} />
      ))}
    </div>
  );
}