import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import type { Climate } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  climate: Climate;
}

export function ClimateCard({ climate }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(climate.entity));
  const [localTemp, setLocalTemp] = useState(climate.target_temperature);

  const handleTemperatureChange = (values: number[]) => {
    setLocalTemp(values[0]);
    callService(currentRoom, 'climate', 'set_temperature', {
      entity_id: climate.entity,
      temperature: values[0]
    });
  };

  return (
    <div className="bg-luxury-bg-light rounded-xl shadow-luxury p-6 transition-shadow hover:shadow-luxury-hover border border-luxury-accent/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-luxury-accent/20">
            <Thermometer className="w-6 h-6 text-luxury-gold" />
          </div>
          <h3 className="ml-3 text-xl font-serif text-luxury-text">{climate.name}</h3>
        </div>
      </div>

      <div className="space-y-8">
        {/* Temperature Control */}
        <div>
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Thermometer className="w-4 h-4 text-luxury-gold mr-2" />
              <span className="text-sm font-medium text-luxury-text">Temperature</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-luxury-text/70">
                Current: {climate.current_temperature}°C
              </span>
              <span className="text-sm font-medium text-luxury-gold">
                Target: {localTemp}°C
              </span>
            </div>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 group"
            value={[localTemp]}
            min={18}
            max={25}
            step={0.5}
            onValueChange={handleTemperatureChange}
          >
            <Slider.Track className="bg-luxury-bg-dark relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-luxury-accent rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb 
              className="block w-5 h-5 bg-luxury-text shadow-luxury rounded-full hover:bg-luxury-text/90 focus:outline-none cursor-grab active:cursor-grabbing group-hover:scale-110 transition-transform"
            />
          </Slider.Root>
        </div>

        {/* Readings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-luxury-bg-dark rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Droplets className="w-4 h-4 text-luxury-gold mr-2" />
              <span className="text-sm font-medium text-luxury-text">Humidity</span>
            </div>
            <span className="text-2xl font-serif text-luxury-text">{climate.humidity}%</span>
          </div>
          <div className="bg-luxury-bg-dark rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Wind className="w-4 h-4 text-luxury-gold mr-2" />
              <span className="text-sm font-medium text-luxury-text">CO₂</span>
            </div>
            <span className="text-2xl font-serif text-luxury-text">{climate.co2} ppm</span>
          </div>
        </div>

        {/* Additional Readings */}
        <div className="grid grid-cols-2 gap-4">
          {climate.readings.map(reading => (
            <div key={reading.entity} className="bg-luxury-bg-dark rounded-lg p-4">
              <span className="text-sm font-medium text-luxury-text/70 block mb-1">
                {reading.name}
              </span>
              <span className="text-xl font-serif text-luxury-text">
                {reading.value} {reading.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}