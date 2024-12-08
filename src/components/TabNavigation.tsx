import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Home, Lightbulb, Thermometer, Volume2, Moon, Bath, Bell } from 'lucide-react';
import clsx from 'clsx';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'lighting', label: 'Lighting', icon: Lightbulb },
  { id: 'climate', label: 'Climate', icon: Thermometer },
  { id: 'audio', label: 'Audio', icon: Volume2 },
  { id: 'scenes', label: 'Scenes', icon: Moon },
  { id: 'bathroom', label: 'Bathroom', icon: Bath },
  { id: 'services', label: 'Services', icon: Bell },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: Props) {
  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List className="flex bg-luxury-bg-light p-1.5 rounded-xl shadow-luxury">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Tabs.Trigger
            key={id}
            value={id}
            className={clsx(
              'flex flex-col items-center px-6 py-3 rounded-lg transition-all duration-200',
              'hover:bg-luxury-bg-dark/50',
              activeTab === id 
                ? 'bg-luxury-accent text-luxury-text shadow-luxury' 
                : 'text-luxury-text/70 hover:text-luxury-text'
            )}
          >
            <Icon className="w-5 h-5 mb-1.5" />
            <span className="text-sm font-medium">{label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}