import { create } from 'zustand';
import type { EntityState } from '../types/state';
import { onEntityUpdate } from '../services/haSocket';
import { fetchRoomStates } from '../services/haApi';

interface EntityStore {
  currentRoom: string;
  entities: Record<string, EntityState>;
  setCurrentRoom: (roomId: string) => void;
  initializeStore: (roomId: string) => Promise<void>;
  updateEntity: (entityId: string, newState: EntityState) => void;
  getEntity: (entityId: string) => EntityState | undefined;
}

export const useEntityStore = create<EntityStore>((set, get) => ({
  currentRoom: '202', // Change default room to 202
  entities: {},
  
  setCurrentRoom: (roomId) => {
    set({ currentRoom: roomId });
    get().initializeStore(roomId);
  },

  initializeStore: async (roomId) => {
    const states = await fetchRoomStates(roomId);
    const stateMap = states.reduce((acc, state) => {
      acc[state.entity_id] = state;
      return acc;
    }, {} as Record<string, EntityState>);
    
    set({ entities: stateMap });
    
    // Subscribe to entity updates
    onEntityUpdate((entityId, newState) => {
      get().updateEntity(entityId, newState);
    });
  },
  
  updateEntity: (entityId, newState) => {
    set(state => ({
      entities: {
        ...state.entities,
        [entityId]: newState
      }
    }));
  },
  
  getEntity: (entityId) => {
    return get().entities[entityId];
  }
}));