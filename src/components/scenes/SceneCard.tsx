import React from 'react';
import { 
  Moon, 
  Sun, 
  Book, 
  Film, 
  Music, 
  Heart, 
  Coffee,
  Sunset,
  Stars,
  Castle,
  Waves,
  BedDouble,
  Sunrise,
  Sofa,
  Utensils,
  Dumbbell,
  Beer,
  Church,
  Baby,
  Users,
  Laptop,
  Focus
} from 'lucide-react';
import type { Scene } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

const sceneIcons: Record<string, any> = {
  moon: Moon,
  sun: Sun,
  book: Book,
  film: Film,
  music: Music,
  heart: Heart,
  coffee: Coffee,
  sunset: Sunset,
  stars: Stars,
  castle: Castle,
  waves: Waves,
  bed: BedDouble,
  sunrise: Sunrise,
  sofa: Sofa,
  utensils: Utensils,
  dumbbell: Dumbbell,
  beer: Beer,
  church: Church,
  baby: Baby,
  users: Users,
  laptop: Laptop,
  focus: Focus
};

const sceneDescriptions: Record<string, string> = {
  'scene.relax_unwind': 'Soft, dimmed lighting in warm tones with gentle spa music',
  'scene.evening_read': 'Perfect lighting for reading with subtle ambient sounds',
  'scene.romantic_night': 'Intimate atmosphere with warm, candle-like lighting',
  'scene.starry_night': 'Magical ambiance with twinkling effects and piano melodies',
  'scene.flemish_charm': 'Warm glow reminiscent of lantern-lit Bruges streets',
  'scene.canal_serenity': 'Calming blue-green lights with water reflections',
  'scene.goodnight_bruges': 'Gradual dimming for a peaceful transition to sleep',
  'scene.rise_shine': 'Gentle wake-up sequence with natural morning sounds',
  'scene.movie_night': 'Optimized lighting for the perfect viewing experience',
  'scene.dinner_two': 'Romantic dinner setting with soft background music',
  'scene.workout_boost': 'Energizing environment for exercise and activity',
  'scene.beer_garden': 'Golden evening ambiance of a Belgian beer garden',
  'scene.medieval_mystery': 'Ancient atmosphere with flickering torch-like effects',
  'scene.dreamland': 'Soothing pastels for peaceful rest and relaxation',
  'scene.family_fun': 'Bright and cheerful setting for family activities',
  'scene.smart_chill': 'Modern mood with ambient electronic soundscapes',
  'scene.focus_mode': 'Clear, productive environment for work or study'
};

interface Props {
  scene: Scene;
}

export function SceneCard({ scene }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(scene.entity));
  const isActive = entity?.state === 'active';
  
  const Icon = sceneIcons[scene.icon] || Moon;
  const description = sceneDescriptions[scene.entity] || 'Create the perfect ambiance';

  const activateScene = () => {
    callService(currentRoom, 'scene', 'turn_on', {
      entity_id: scene.entity
    });
  };

  return (
    <button
      onClick={activateScene}
      className={`
        relative group overflow-hidden rounded-xl p-6 text-left transition-all duration-300
        ${isActive 
          ? 'bg-luxury-accent shadow-luxury border border-luxury-gold/30' 
          : 'bg-luxury-bg-light shadow-luxury hover:shadow-luxury-hover border border-luxury-accent/10 hover:border-luxury-accent/30'
        }
      `}
    >
      {/* Background Pattern */}
      <div 
        className={`
          absolute inset-0 opacity-5 transition-opacity duration-300
          ${isActive ? 'opacity-10' : 'group-hover:opacity-10'}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23DAA520' d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
          transform: 'rotate(30deg)'
        }}
      />

      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`
            p-3 rounded-lg transition-colors duration-300
            ${isActive 
              ? 'bg-luxury-gold text-luxury-bg' 
              : 'bg-luxury-bg-dark text-luxury-gold group-hover:bg-luxury-accent/20'
            }
          `}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <h3 className={`
          text-xl font-serif mb-2 transition-colors duration-300
          ${isActive ? 'text-luxury-text' : 'text-luxury-text group-hover:text-luxury-gold'}
        `}>
          {scene.name}
        </h3>

        <p className={`
          text-sm transition-colors duration-300
          ${isActive ? 'text-luxury-text/90' : 'text-luxury-text/70'}
        `}>
          {description}
        </p>

        <div className={`
          mt-4 text-sm font-medium transition-colors duration-300
          ${isActive ? 'text-luxury-gold' : 'text-luxury-accent group-hover:text-luxury-gold'}
        `}>
          {isActive ? 'Currently Active' : 'Click to Activate'}
        </div>
      </div>
    </button>
  );
}