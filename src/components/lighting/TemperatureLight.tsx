import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Lightbulb } from 'lucide-react';
import type { Light } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  light: Light;
}

export function TemperatureLight({ light }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(light.entity));
  const isOn = entity?.state === 'on';
  const brightness = entity?.attributes?.brightness ?? 255;
  const colorTemp = entity?.attributes?.color_temp ?? 400;

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

  const handleTemperatureChange = (values: number[]) => {
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

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Temperature
            </label>
            <span className="text-sm text-gray-500">
              {getTemperatureLabel(colorTemp)}
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[colorTemp]}
            min={153}
            max={500}
            step={1}
            onValueChange={handleTemperatureChange}
          >
            <Slider.Track className="bg-gradient-to-r from-blue-200 via-gray-100 to-amber-200 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-transparent rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none" />
          </Slider.Root>
        </div>
      </div>
    </div>
  );
}