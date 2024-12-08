import { ROOM_101, ROOM_202 } from './roomConfigs';
import type { RoomConfig } from '../types/room';

const rooms: Record<string, RoomConfig> = {
  '101': ROOM_101,
  '202': ROOM_202,
};

export function getRoomConfig(roomNumber: string): RoomConfig | undefined {
  return rooms[roomNumber];
}

export function getAllRoomNumbers(): string[] {
  return Object.keys(rooms);
}