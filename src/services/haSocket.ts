import type { EntityState } from '../types/state';
import { currentStatesPerRoom } from './haApi';

type EntityUpdateCallback = (entityId: string, newState: EntityState) => void;

// Initialize the subscribers array in the global space
(window as any).__haSocketSubscribers = [];

export function onEntityUpdate(callback: EntityUpdateCallback): () => void {
  const subscribers = (window as any).__haSocketSubscribers;
  subscribers.push(callback);

  // Return cleanup function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
}

// Simulate real-time updates (for development only)
let intervalId: number | null = null;

export function startMockUpdates() {
  if (intervalId !== null) return;

  intervalId = window.setInterval(() => {
    Object.keys(currentStatesPerRoom).forEach(roomId => {
      const roomStates = currentStatesPerRoom[roomId];
      Object.values(roomStates).forEach(state => {
        const subscribers = (window as any).__haSocketSubscribers;
        subscribers.forEach((callback: EntityUpdateCallback) => {
          callback(state.entity_id, state);
        });
      });
    });
  }, 100); // Increased update frequency for smoother UI
}

export function stopMockUpdates() {
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

// Start mock updates when the module loads
startMockUpdates();