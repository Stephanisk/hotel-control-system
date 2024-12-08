import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface Props {
  value: number;
  onChange: (values: number[]) => void;
}

export function BrightnessSlider({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);

  const handleValueChange = (values: number[]) => {
    setLocalValue(values[0]);
    onChange(values);
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Brightness
        </label>
        <span className="text-sm text-gray-500">
          {Math.round((localValue / 255) * 100)}%
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 group"
        value={[localValue]}
        max={255}
        step={1}
        onValueChange={handleValueChange}
        aria-label="Brightness"
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-amber-500 rounded-full h-full" />
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