import React from 'react';
import { Clock, Moon, Sun, Volume2, Thermometer, Bath, Bell } from 'lucide-react';
import type { RoomConfig } from '../types/room';

interface Props {
  config: RoomConfig;
}

export function RoomControls({ config }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif">{config.room_name}</h1>
          <p className="text-gray-400 mt-1">Threads of Time Hotel</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lighting Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Sun className="w-6 h-6 text-amber-500 mr-3" />
              <h2 className="text-xl font-semibold">Lighting</h2>
            </div>
            <div className="space-y-4">
              {config.lights.map(light => (
                <div key={light.entity} className="flex items-center justify-between">
                  <span>{light.name}</span>
                  <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors">
                    {light.type === 'dimmable' ? 'Adjust' : 'Toggle'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Climate Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Thermometer className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold">Climate</h2>
            </div>
            <div className="space-y-4">
              {config.climate.map(unit => (
                <div key={unit.entity} className="space-y-2">
                  <span>{unit.name}</span>
                  <input 
                    type="range" 
                    min="18" 
                    max="28" 
                    className="w-full"
                    defaultValue="22"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Audio Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Volume2 className="w-6 h-6 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold">Audio</h2>
            </div>
            <div className="space-y-4">
              {config.audio.map(audio => (
                <div key={audio.entity} className="space-y-2">
                  <span>{audio.name}</span>
                  <input 
                    type="range" 
                    min="0" 
                    max={audio.max_volume} 
                    className="w-full"
                    defaultValue="0"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Scenes Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Moon className="w-6 h-6 text-indigo-500 mr-3" />
              <h2 className="text-xl font-semibold">Scenes</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {config.scenes.map(scene => (
                <button
                  key={scene.entity}
                  className="px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  {scene.name}
                </button>
              ))}
            </div>
          </section>

          {/* Bathroom Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Bath className="w-6 h-6 text-teal-500 mr-3" />
              <h2 className="text-xl font-semibold">Bathroom</h2>
            </div>
            <div className="space-y-4">
              {config.bathroom.lights.map(light => (
                <div key={light.entity} className="flex items-center justify-between">
                  <span>{light.name}</span>
                  <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors">
                    Toggle
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-rose-500 mr-3" />
              <h2 className="text-xl font-semibold">Services</h2>
            </div>
            <div className="space-y-4">
              {config.requests.map(request => (
                <button
                  key={request.entity}
                  className="w-full px-4 py-3 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  {request.name}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}