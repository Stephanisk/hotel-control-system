import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import type { Light } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  light: Light;
}

export function TemperatureControls({ light }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(light.entity));
  const [localTemp, setLocalTemp] = useState(entity?.attributes?.color_temp ?? 400);

  const handleTemperatureChange = (values: number[]) => {
    setLocalTemp(values[0]);
    callService(currentRoom, 'light', 'turn_on', {
      entity_id: light.entity,
      color_temp: values[0]
    });
  };

  const getTemperatureLabel = (temp: number) => {
    const percentage = (temp - 153) / (500 - 153);
    return percentage <= 0.5 ? 'Cool White' : 'Warm White';
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Temperature
        </label>
        <span className="text-sm text-gray-500">
          {getTemperatureLabel(localTemp)}
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 group"
        value={[localTemp]}
        min={153}
        max={500}
        step={1}
        onValueChange={handleTemperatureChange}
      >
        <Slider.Track className="bg-gradient-to-r from-blue-200 via-gray-100 to-amber-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-transparent rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb 
          className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing group-hover:scale-110 transition-transform"
          style={{ 
            touchAction: 'none',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateZ(0)'
          }}
        />
      </Slider.Root>
    </div>
  );
}