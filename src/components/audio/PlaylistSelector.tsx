import React from 'react';
import { Music2, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onPlaylistSelect: (playlist: string) => void;
  source: string;
}

// Mock playlists - in real implementation, these would come from Home Assistant
const mockPlaylists = {
  spotify: [
    { id: 'relaxation', name: 'Relaxation', description: 'Calm and soothing melodies' },
    { id: 'classical', name: 'Classical Collection', description: 'Timeless classical pieces' },
    { id: 'jazz', name: 'Jazz Essentials', description: 'Smooth jazz favorites' },
    { id: 'ambient', name: 'Ambient Sounds', description: 'Background music for focus' },
  ],
  radio: [
    { id: 'classical_fm', name: 'Classical FM', description: 'Live classical music' },
    { id: 'jazz_24', name: 'Jazz 24/7', description: 'Non-stop jazz radio' },
    { id: 'lounge', name: 'Luxury Lounge', description: 'Sophisticated lounge music' },
    { id: 'world', name: 'World Music', description: 'Global music selection' },
  ],
};

export function PlaylistSelector({ onClose, onPlaylistSelect, source }: Props) {
  const playlists = mockPlaylists[source as keyof typeof mockPlaylists] || [];

  return (
    <div className="fixed inset-0 bg-luxury-overlay backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-luxury-bg-light rounded-xl shadow-luxury p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-luxury-text">Select Playlist</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-luxury-bg-dark transition-colors"
          >
            <X className="w-5 h-5 text-luxury-text/70" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {playlists.map(({ id, name, description }) => (
            <button
              key={id}
              onClick={() => onPlaylistSelect(id)}
              className="flex items-center space-x-4 p-4 rounded-lg bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-luxury-accent/20">
                <Music2 className="w-6 h-6 text-luxury-gold" />
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