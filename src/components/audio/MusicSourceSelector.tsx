import React from 'react';
import { Music2, Radio, Disc, Mic2, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSourceSelect: (source: string) => void;
}

const sources = [
  { id: 'spotify', name: 'Spotify', icon: Music2, description: 'Stream from Spotify' },
  { id: 'radio', name: 'Radio', icon: Radio, description: 'Listen to radio stations' },
  { id: 'local', name: 'Local Music', icon: Disc, description: 'Play from local library' },
  { id: 'aux', name: 'Line In', icon: Mic2, description: 'Play from connected device' },
];

export function MusicSourceSelector({ onClose, onSourceSelect }: Props) {
  return (
    <div className="fixed inset-0 bg-luxury-overlay backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-luxury-bg-light rounded-xl shadow-luxury p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-luxury-text">Select Music Source</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-luxury-bg-dark transition-colors"
          >
            <X className="w-5 h-5 text-luxury-text/70" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sources.map(({ id, name, icon: Icon, description }) => (
            <button
              key={id}
              onClick={() => onSourceSelect(id)}
              className="flex items-center space-x-4 p-4 rounded-lg bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-luxury-accent/20">
                <Icon className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-luxury-text">{name}</h4>
                <p className="text-sm text-luxury-text/70">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}