import React, { useState, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Volume2, Play, Pause, SkipBack, SkipForward, Music2 } from 'lucide-react';
import type { Audio } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';
import { SpotifyPlaylistSelector } from './SpotifyPlaylistSelector';
import { getCurrentTrack } from '../../services/spotifyService';

interface Props {
  audio: Audio;
}

export function AudioCard({ audio }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(audio.entity));
  const [showPlaylistSelector, setShowPlaylistSelector] = useState(false);
  const [currentTrackInfo, setCurrentTrackInfo] = useState<any>(null);
  
  const isPlaying = entity?.state === 'playing';
  const volume = Math.round((entity?.attributes?.volume_level ?? 0) * 100);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const track = await getCurrentTrack(currentRoom, audio.entity);
        if (track) {
          setCurrentTrackInfo(track);
        }
      } catch (error) {
        console.error('Failed to fetch current track:', error);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [currentRoom, audio.entity]);

  const handleVolumeChange = (values: number[]) => {
    callService(currentRoom, 'media_player', 'volume_set', {
      entity_id: audio.entity,
      volume_level: values[0] / 100
    });
  };

  const handlePlayPause = () => {
    const service = isPlaying ? 'media_pause' : 'media_play';
    callService(currentRoom, 'media_player', service, {
      entity_id: audio.entity
    });
  };

  const handleSkip = (direction: 'previous' | 'next') => {
    const service = direction === 'previous' ? 'media_previous_track' : 'media_next_track';
    callService(currentRoom, 'media_player', service, {
      entity_id: audio.entity
    });
  };

  return (
    <div className="bg-luxury-bg-light rounded-xl shadow-luxury p-6 transition-shadow hover:shadow-luxury-hover border border-luxury-accent/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-luxury-accent/20">
            <Volume2 className="w-6 h-6 text-luxury-gold" />
          </div>
          <h3 className="ml-3 text-xl font-serif text-luxury-text">{audio.name}</h3>
        </div>
        <button
          onClick={() => setShowPlaylistSelector(true)}
          className="px-4 py-2 rounded-lg bg-luxury-bg-dark text-luxury-text/70 hover:text-luxury-text hover:bg-luxury-bg border border-luxury-accent/20 transition-colors flex items-center space-x-2"
        >
          <Music2 className="w-4 h-4" />
          <span>Select Music</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Now Playing */}
        <div className="bg-luxury-bg-dark rounded-lg p-4 flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={currentTrackInfo?.album?.images[0]?.url || 'https://source.unsplash.com/featured/?music,luxury'}
              alt="Album Art"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center mb-2">
              <Music2 className="w-4 h-4 text-luxury-gold mr-2" />
              <span className="text-sm font-medium text-luxury-text">Now Playing</span>
            </div>
            <p className="text-lg font-serif text-luxury-text truncate">
              {currentTrackInfo?.name || 'No track selected'}
            </p>
            {currentTrackInfo?.artists && (
              <p className="text-sm text-luxury-text/70 truncate">
                {currentTrackInfo.artists.map(a => a.name).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Volume Control */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-luxury-text">Volume</span>
            <span className="text-sm text-luxury-text/70">{volume}%</span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 group"
            value={[volume]}
            max={audio.max_volume}
            step={1}
            onValueChange={handleVolumeChange}
          >
            <Slider.Track className="bg-luxury-bg-dark relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-luxury-accent rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb 
              className="block w-5 h-5 bg-luxury-text shadow-luxury rounded-full hover:bg-luxury-text/90 focus:outline-none cursor-grab active:cursor-grabbing group-hover:scale-110 transition-transform"
            />
          </Slider.Root>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={() => handleSkip('previous')}
            className="p-3 rounded-full bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors"
          >
            <SkipBack className="w-6 h-6 text-luxury-gold" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-4 rounded-full bg-luxury-accent hover:bg-luxury-accent-light transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-luxury-text" />
            ) : (
              <Play className="w-8 h-8 text-luxury-text" />
            )}
          </button>
          <button
            onClick={() => handleSkip('next')}
            className="p-3 rounded-full bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors"
          >
            <SkipForward className="w-6 h-6 text-luxury-gold" />
          </button>
        </div>
      </div>

      {/* Spotify Playlist Selector */}
      {showPlaylistSelector && (
        <SpotifyPlaylistSelector
          entityId={audio.entity}
          onClose={() => setShowPlaylistSelector(false)}
        />
      )}
    </div>
  );
}