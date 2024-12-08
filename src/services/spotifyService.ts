import { callService } from './haApi';
import type { SpotifyPlaylist, SpotifyTrack, SpotifyCategory } from '../types/spotify';

// Mock data for development
const MOCK_CATEGORIES: SpotifyCategory[] = [
  {
    id: 'classical',
    name: 'Classical',
    description: 'Timeless classical compositions',
    icon: 'https://source.unsplash.com/featured/?classical,orchestra',
    playlists: [
      {
        id: 'classical_evening',
        name: 'Classical Evening',
        description: 'Elegant classical pieces for a sophisticated evening',
        images: [{ url: 'https://source.unsplash.com/1600x900/?classical,piano' }],
        uri: 'spotify:playlist:classical_evening',
        tracks: 42
      },
      {
        id: 'baroque_essentials',
        name: 'Baroque Essentials',
        description: 'Essential baroque masterpieces',
        images: [{ url: 'https://source.unsplash.com/1600x900/?baroque,music' }],
        uri: 'spotify:playlist:baroque_essentials',
        tracks: 35
      }
    ]
  },
  {
    id: 'jazz',
    name: 'Jazz',
    description: 'Smooth jazz and lounge music',
    icon: 'https://source.unsplash.com/featured/?jazz,saxophone',
    playlists: [
      {
        id: 'jazz_lounge',
        name: 'Jazz Lounge',
        description: 'Smooth jazz selections for the perfect ambiance',
        images: [{ url: 'https://source.unsplash.com/1600x900/?jazz,lounge' }],
        uri: 'spotify:playlist:jazz_lounge',
        tracks: 50
      },
      {
        id: 'jazz_classics',
        name: 'Jazz Classics',
        description: 'Timeless jazz standards',
        images: [{ url: 'https://source.unsplash.com/1600x900/?jazz,trumpet' }],
        uri: 'spotify:playlist:jazz_classics',
        tracks: 45
      }
    ]
  },
  {
    id: 'ambient',
    name: 'Ambient',
    description: 'Relaxing ambient soundscapes',
    icon: 'https://source.unsplash.com/featured/?ambient,calm',
    playlists: [
      {
        id: 'ambient_luxury',
        name: 'Ambient Luxury',
        description: 'Refined ambient sounds for relaxation',
        images: [{ url: 'https://source.unsplash.com/1600x900/?ambient,luxury' }],
        uri: 'spotify:playlist:ambient_luxury',
        tracks: 30
      },
      {
        id: 'nature_sounds',
        name: 'Nature Sounds',
        description: 'Calming natural ambiance',
        images: [{ url: 'https://source.unsplash.com/1600x900/?nature,peaceful' }],
        uri: 'spotify:playlist:nature_sounds',
        tracks: 25
      }
    ]
  },
  {
    id: 'world',
    name: 'World',
    description: 'Global musical traditions',
    icon: 'https://source.unsplash.com/featured/?world,music',
    playlists: [
      {
        id: 'world_fusion',
        name: 'World Fusion',
        description: 'A curated blend of global musical traditions',
        images: [{ url: 'https://source.unsplash.com/1600x900/?world,instruments' }],
        uri: 'spotify:playlist:world_fusion',
        tracks: 38
      },
      {
        id: 'asian_traditions',
        name: 'Asian Traditions',
        description: 'Traditional Asian music',
        images: [{ url: 'https://source.unsplash.com/1600x900/?asia,music' }],
        uri: 'spotify:playlist:asian_traditions',
        tracks: 32
      }
    ]
  }
];

const FEATURED_PLAYLISTS: SpotifyPlaylist[] = [
  {
    id: 'luxury_evening',
    name: 'Luxury Evening',
    description: 'The perfect soundtrack for an elegant evening',
    images: [{ url: 'https://source.unsplash.com/1600x900/?luxury,evening' }],
    uri: 'spotify:playlist:luxury_evening',
    tracks: 55
  },
  {
    id: 'hotel_vibes',
    name: 'Hotel Vibes',
    description: 'Sophisticated sounds for the perfect ambiance',
    images: [{ url: 'https://source.unsplash.com/1600x900/?hotel,luxury' }],
    uri: 'spotify:playlist:hotel_vibes',
    tracks: 48
  }
];

export async function getSpotifyCategories(): Promise<SpotifyCategory[]> {
  // In production, this would fetch from Home Assistant's Spotify integration
  return MOCK_CATEGORIES;
}

export async function getFeaturedPlaylists(): Promise<SpotifyPlaylist[]> {
  // In production, this would fetch from Home Assistant's Spotify integration
  return FEATURED_PLAYLISTS;
}

export async function getSpotifyPlaylists(categoryId: string): Promise<SpotifyPlaylist[]> {
  // In production, this would fetch from Home Assistant's Spotify integration
  const category = MOCK_CATEGORIES.find(c => c.id === categoryId);
  return category?.playlists || [];
}

export async function playSpotifyPlaylist(roomId: string, entityId: string, playlist: SpotifyPlaylist) {
  return callService(roomId, 'media_player', 'play_media', {
    entity_id: entityId,
    media_content_id: playlist.uri,
    media_content_type: 'playlist'
  });
}

export async function getCurrentTrack(roomId: string, entityId: string): Promise<SpotifyTrack | null> {
  // In production, this would fetch from Home Assistant
  return {
    name: 'Moonlight Sonata',
    artists: [{ name: 'Ludwig van Beethoven' }],
    album: {
      name: 'Classical Masterpieces',
      images: [{ url: 'https://source.unsplash.com/1600x900/?classical,piano' }]
    }
  };
}