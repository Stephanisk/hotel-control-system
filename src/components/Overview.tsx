import React from 'react';
import type { RoomConfig } from '../types/room';
import { 
  Lightbulb, 
  Thermometer, 
  Volume2, 
  Moon, 
  Bath, 
  Bell 
} from 'lucide-react';

interface Props {
  config: RoomConfig;
  onNavigate: (tab: string) => void;
}

export function Overview({ config, onNavigate }: Props) {
  const cards = [
    {
      id: 'lighting',
      title: 'Lighting',
      icon: Lightbulb,
      color: 'amber',
      summary: `${config.lights.length} lights available`
    },
    {
      id: 'climate',
      title: 'Climate',
      icon: Thermometer,
      color: 'blue',
      summary: `${config.climate[0].current_temperature}°C, ${config.climate[0].humidity}% humidity`
    },
    {
      id: 'audio',
      title: 'Audio',
      icon: Volume2,
      color: 'purple',
      summary: 'Audio system ready'
    },
    {
      id: 'scenes',
      title: 'Scenes',
      icon: Moon,
      color: 'indigo',
      summary: `${config.scenes.length} scenes available`
    },
    {
      id: 'bathroom',
      title: 'Bathroom',
      icon: Bath,
      color: 'teal',
      summary: 'Motion activated'
    },
    {
      id: 'services',
      title: 'Services',
      icon: Bell,
      color: 'rose',
      summary: `${config.requests.length} services available`
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {cards.map(({ id, title, icon: Icon, color, summary }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`bg-${color}-50 p-6 rounded-xl text-left hover:bg-${color}-100 transition-colors`}
        >
          <Icon className={`w-8 h-8 text-${color}-500 mb-4`} />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{summary}</p>
        </button>
      ))}
    </div>
  );
}