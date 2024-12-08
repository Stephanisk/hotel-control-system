export interface Scene {
  entity: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Light {
  entity: string;
  name: string;
  type: 'rgb' | 'temperature' | 'simple';
  supports_color?: boolean;
  supports_temperature?: boolean;
}

export interface Climate {
  entity: string;
  name: string;
  current_temperature: number;
  target_temperature: number;
  humidity: number;
  co2: number;
  readings: Array<{
    entity: string;
    name: string;
    value: number;
    unit: string;
  }>;
}

export interface Audio {
  entity: string;
  name: string;
  max_volume: number;
}

export interface RoomConfig {
  room_name: string;
  lights: Light[];
  climate: Climate[];
  audio: Audio[];
  scenes: Scene[];
  bathroom: {
    lights: Light[];
    motion_activated: boolean;
  };
  alarm_clock: Array<{
    entity: string;
    name: string;
  }>;
  room_info: Array<{
    entity: string;
    value: string;
  }>;
  requests: Array<{
    entity: string;
    name: string;
    icon: string;
  }>;
}