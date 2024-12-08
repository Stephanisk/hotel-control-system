import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { RGBControls } from './RGBControls';
import { TemperatureControls } from './TemperatureControls';
import { BrightnessSlider } from './BrightnessSlider';
import type { Light } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  light: Light;
}

export function LightCard({ light }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(light.entity));
  const [mode, setMode] = useState<'color' | 'temperature'>(
    light.supports_color ? 'color' : 'temperature'
  );
  
  const [isOn, setIsOn] = useState(entity?.state === 'on');

  const brightness = entity?.attributes?.brightness ?? 255;

  const handleToggle = async () => {
    const newState = !isOn;
    setIsOn(newState);
    const service = newState ? 'turn_on' : 'turn_off';
    await callService(currentRoom, 'light', service, {
      entity_id: light.entity,
      ...(service === 'turn_on' && { brightness })
    });
  };

  const handleBrightnessChange = async (values: number[]) => {
    await callService(currentRoom, 'light', 'turn_on', {
      entity_id: light.entity,
      brightness: values[0]
    });
  };

  return (
    <div className="bg-luxury-bg-light rounded-xl shadow-luxury p-6 transition-shadow hover:shadow-luxury-hover border border-luxury-accent/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div 
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isOn ? 'bg-luxury-accent/20' : 'bg-luxury-bg-dark'
            }`}
          >
            <Lightbulb 
              className={`w-6 h-6 transition-colors duration-200 ${
                isOn ? 'text-[#FFD700]' : 'text-luxury-text/50'
              }`} 
              fill={isOn ? 'currentColor' : 'none'}
            />
          </div>
          <h3 className="ml-3 text-xl font-serif text-luxury-text">{light.name}</h3>
        </div>
        <button
          onClick={handleToggle}
          className={`min-w-[100px] h-[42px] px-5 rounded-lg transition-all duration-200 font-medium ${
            isOn 
              ? 'bg-luxury-accent text-luxury-text shadow-luxury hover:bg-luxury-accent-light' 
              : 'bg-luxury-bg-dark text-luxury-text/70 hover:text-luxury-text hover:bg-luxury-bg border border-luxury-accent/20'
          }`}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
      </div>

      <div className="space-y-8">
        <BrightnessSlider 
          value={brightness}
          onChange={handleBrightnessChange}
        />

        {light.supports_color && light.supports_temperature && (
          <Tabs.Root value={mode} onValueChange={(value) => setMode(value as 'color' | 'temperature')}>
            <Tabs.List className="flex space-x-3 mb-6">
              <Tabs.Trigger
                value="color"
                className={`flex-1 px-5 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  mode === 'color' 
                    ? 'bg-luxury-accent text-luxury-text shadow-luxury' 
                    : 'bg-luxury-bg-dark text-luxury-text/70 hover:text-luxury-text border border-luxury-accent/20'
                }`}
              >
                RGB Color
              </Tabs.Trigger>
              <Tabs.Trigger
                value="temperature"
                className={`flex-1 px-5 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  mode === 'temperature' 
                    ? 'bg-luxury-accent text-luxury-text shadow-luxury' 
                    : 'bg-luxury-bg-dark text-luxury-text/70 hover:text-luxury-text border border-luxury-accent/20'
                }`}
              >
                White Temperature
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="color">
              <RGBControls light={light} />
            </Tabs.Content>
            <Tabs.Content value="temperature">
              <TemperatureControls light={light} />
            </Tabs.Content>
          </Tabs.Root>
        )}

        {light.supports_color && !light.supports_temperature && (
          <RGBControls light={light} />
        )}

        {!light.supports_color && light.supports_temperature && (
          <TemperatureControls light={light} />
        )}
      </div>
    </div>
  );
}