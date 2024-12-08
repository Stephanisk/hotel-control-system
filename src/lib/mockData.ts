import type { RoomConfig } from '../types/room';

export const MOCK_ROOM_CONFIG: RoomConfig = {
  room_name: "Suite 101",
  lights: [
    { 
      entity: "light.main", 
      name: "Main Lights", 
      type: "rgb",
      supports_color: true,
      supports_temperature: true
    },
    { 
      entity: "light.bedside", 
      name: "Bedside Lamp", 
      type: "temperature",
      supports_temperature: true
    }
  ],
  climate: [
    {
      entity: "climate.main",
      name: "Temperature Control",
      current_temperature: 22.5,
      target_temperature: 23,
      humidity: 45,
      co2: 800,
      readings: [
        { entity: "sensor.temperature", name: "Temperature", value: 22.5, unit: "°C" },
        { entity: "sensor.humidity", name: "Humidity", value: 45, unit: "%" },
        { entity: "sensor.co2", name: "CO2", value: 800, unit: "ppm" },
        { entity: "sensor.pressure", name: "Pressure", value: 1013, unit: "hPa" }
      ]
    }
  ],
  audio: [
    { entity: "media_player.room", name: "Audio System", max_volume: 50 }
  ],
  scenes: [
    { entity: "scene.evening", name: "Evening Mood", icon: "moon" },
    { entity: "scene.morning", name: "Morning Rise", icon: "sun" },
    { entity: "scene.cinema", name: "Cinema Mode", icon: "film" },
    { entity: "scene.reading", name: "Reading Light", icon: "book" }
  ],
  bathroom: {
    lights: [
      { entity: "light.bathroom", name: "Bathroom Light", type: "temperature" }
    ],
    motion_activated: true
  },
  alarm_clock: [
    { entity: "input_datetime.alarm", name: "Wake-up Time" },
    { entity: "switch.alarm_active", name: "Alarm Active" }
  ],
  room_info: [
    { entity: "sensor.welcome", value: "Welcome to Threads of Time Hotel" },
    { entity: "sensor.checkout", value: "Checkout time: 11:00 AM" }
  ],
  requests: [
    { entity: "script.housekeeping", name: "Request Housekeeping", icon: "broom" },
    { entity: "switch.dnd", name: "Do Not Disturb", icon: "moon" },
    { entity: "script.room_service", name: "Room Service", icon: "utensils" },
    { entity: "script.maintenance", name: "Maintenance", icon: "tool" }
  ]
};