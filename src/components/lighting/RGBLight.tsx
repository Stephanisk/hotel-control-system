import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import * as Slider from '@radix-ui/react-slider';
import { Lightbulb } from 'lucide-react';
import type { Light } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  light: Light;
}

export function RGBLight({ light }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(light.entity));
  const [color, setColor] = useState('#ffffff');
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  const isOn = entity?.state === 'on';
  const brightness = entity?.attributes?.brightness ?? 255;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    callService(currentRoom, 'light', isOn ? 'turn_off' : 'turn_on', {
      entity_id: light.entity
    });
  };

  const handleBrightnessChange = (values: number[]) => {
    callService(currentRoom, 'light', 'turn_on', {
      entity_id: light.entity,
      brightness: values[0]
    });
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    callService(currentRoom, 'light', 'turn_on', {
      entity_id: light.entity,
      rgb_color: hexToRgb(color)
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
          <h3 className="text-lg font-medium">{light.name}</h3>
        </div>
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isOn ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brightness
          </label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[brightness]}
            max={255}
            step={1}
            onValueChange={handleBrightnessChange}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-amber-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none" />
          </Slider.Root>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-full h-10 rounded-lg border-2 transition-shadow hover:shadow-md"
            style={{ backgroundColor: color }}
          />
          {showPicker && (
            <div 
              ref={pickerRef}
              className="absolute mt-2 z-10 bg-white p-3 rounded-lg shadow-xl border border-gray-200"
            >
              <HexColorPicker color={color} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : [255, 255, 255];
}