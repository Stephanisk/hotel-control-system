import React, { useEffect, useState } from 'react';
import { Music2, X, Loader2, ChevronLeft } from 'lucide-react';
import { getSpotifyCategories, getFeaturedPlaylists, getSpotifyPlaylists, playSpotifyPlaylist } from '../../services/spotifyService';
import { useEntityStore } from '../../store/entityStore';
import type { SpotifyCategory, SpotifyPlaylist } from '../../types/spotify';

interface Props {
  entityId: string;
  onClose: () => void;
}

export function SpotifyPlaylistSelector({ entityId, onClose }: Props) {
  const [view, setView] = useState<'categories' | 'playlists'>('categories');
  const [categories, setCategories] = useState<SpotifyCategory[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SpotifyCategory | null>(null);
  const [categoryPlaylists, setCategoryPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const currentRoom = useEntityStore(state => state.currentRoom);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, featuredData] = await Promise.all([
          getSpotifyCategories(),
          getFeaturedPlaylists()
        ]);
        setCategories(categoriesData);
        setFeaturedPlaylists(featuredData);
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCategorySelect = async (category: SpotifyCategory) => {
    setLoading(true);
    setSelectedCategory(category);
    setView('playlists');
    try {
      const playlists = await getSpotifyPlaylists(category.id);
      setCategoryPlaylists(playlists);
    } catch (error) {
      console.error('Failed to fetch category playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaylistSelect = async (playlist: SpotifyPlaylist) => {
    try {
      await playSpotifyPlaylist(currentRoom, entityId, playlist);
      onClose();
    } catch (error) {
      console.error('Failed to play playlist:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-luxury-overlay backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-luxury-bg-light rounded-xl shadow-luxury p-6 max-w-3xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {view === 'playlists' && (
              <button
                onClick={() => setView('categories')}
                className="p-2 rounded-lg hover:bg-luxury-bg-dark transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-luxury-gold" />
              </button>
            )}
            <div>
              <h3 className="text-xl font-serif text-luxury-text">
                {view === 'categories' ? 'Browse Music' : selectedCategory?.name}
              </h3>
              <p className="text-sm text-luxury-text/70 mt-1">
                {view === 'categories' ? 'Select a category or featured playlist' : selectedCategory?.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-luxury-bg-dark transition-colors"
          >
            <X className="w-5 h-5 text-luxury-text/70" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
          </div>
        ) : view === 'categories' ? (
          <div className="space-y-8">
            {/* Featured Playlists */}
            <div>
              <h4 className="text-lg font-serif text-luxury-text mb-4">Featured</h4>
              <div className="grid grid-cols-2 gap-4">
                {featuredPlaylists.map(playlist => (
                  <button
                    key={playlist.id}
                    onClick={() => handlePlaylistSelect(playlist)}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors text-left group"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={playlist.images[0]?.url} 
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h5 className="text-lg font-serif text-luxury-text group-hover:text-luxury-gold transition-colors">
                        {playlist.name}
                      </h5>
                      <p className="text-sm text-luxury-text/70 mt-1 line-clamp-2">
                        {playlist.description}
                      </p>
                      <p className="text-sm text-luxury-gold mt-2">
                        {playlist.tracks} tracks
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-serif text-luxury-text mb-4">Categories</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="p-4 rounded-lg bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors text-center group"
                  >
                    <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden mb-3">
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h5 className="text-lg font-serif text-luxury-text group-hover:text-luxury-gold transition-colors">
                      {category.name}
                    </h5>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {categoryPlaylists.map(playlist => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistSelect(playlist)}
                className="flex items-start space-x-4 p-4 rounded-lg bg-luxury-bg-dark hover:bg-luxury-accent/20 transition-colors text-left group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={playlist.images[0]?.url} 
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-luxury-text group-hover:text-luxury-gold transition-colors">
                    {playlist.name}
                  </h4>
                  <p className="text-sm text-luxury-text/70 mt-1 line-clamp-2">
                    {playlist.description}
                  </p>
                  <p className="text-sm text-luxury-gold mt-2">
                    {playlist.tracks} tracks
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}