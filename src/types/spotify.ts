export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  uri: string;
  tracks: number;
}

export interface SpotifyCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  playlists: SpotifyPlaylist[];
}

export interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

export interface SpotifyState {
  is_playing: boolean;
  current_track: SpotifyTrack;
}