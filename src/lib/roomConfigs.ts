import type { RoomConfig } from '../types/room';

export const ROOM_202: RoomConfig = {
  room_name: "Executive Suite 202",
  lights: [
    { 
      entity: "light.chandelier", 
      name: "Chandelier", 
      type: "rgb",
      supports_color: true,
      supports_temperature: true
    },
    { 
      entity: "light.bedside_left", 
      name: "Left Bedside", 
      type: "temperature",
      supports_temperature: true
    },
    { 
      entity: "light.bedside_right", 
      name: "Right Bedside", 
      type: "temperature",
      supports_temperature: true
    }
  ],
  climate: [
    {
      entity: "climate.main",
      name: "Climate Control",
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
    { 
      entity: "scene.relax_unwind", 
      name: "Relax & Unwind", 
      icon: "moon", 
      description: "Soft, dimmed lighting in warm tones with gentle spa music"
    },
    { 
      entity: "scene.evening_read", 
      name: "Evening Read", 
      icon: "book", 
      description: "Perfect lighting for reading with subtle ambient sounds"
    },
    { 
      entity: "scene.romantic_night", 
      name: "Romantic Night", 
      icon: "heart", 
      description: "Intimate atmosphere with warm, candle-like lighting"
    },
    { 
      entity: "scene.starry_night", 
      name: "Starry Night", 
      icon: "stars", 
      description: "Magical ambiance with twinkling effects and piano melodies"
    },
    { 
      entity: "scene.flemish_charm", 
      name: "Flemish Charm", 
      icon: "castle", 
      description: "Warm glow reminiscent of lantern-lit Bruges streets"
    },
    { 
      entity: "scene.canal_serenity", 
      name: "Canal Serenity", 
      icon: "waves", 
      description: "Calming blue-green lights with water reflections"
    },
    { 
      entity: "scene.goodnight_bruges", 
      name: "Goodnight Bruges", 
      icon: "bed", 
      description: "Gradual dimming for a peaceful transition to sleep"
    },
    { 
      entity: "scene.rise_shine", 
      name: "Rise & Shine", 
      icon: "sunrise", 
      description: "Gentle wake-up sequence with natural morning sounds"
    },
    { 
      entity: "scene.movie_night", 
      name: "Movie Night", 
      icon: "film", 
      description: "Optimized lighting for the perfect viewing experience"
    },
    { 
      entity: "scene.dinner_two", 
      name: "Dinner for Two", 
      icon: "utensils", 
      description: "Romantic dinner setting with soft background music"
    },
    { 
      entity: "scene.workout_boost", 
      name: "Workout Boost", 
      icon: "dumbbell", 
      description: "Energizing environment for exercise and activity"
    },
    { 
      entity: "scene.beer_garden", 
      name: "Beer Garden Vibes", 
      icon: "beer", 
      description: "Golden evening ambiance of a Belgian beer garden"
    },
    { 
      entity: "scene.medieval_mystery", 
      name: "Medieval Mystery", 
      icon: "church", 
      description: "Ancient atmosphere with flickering torch-like effects"
    },
    { 
      entity: "scene.dreamland", 
      name: "Dreamland", 
      icon: "baby", 
      description: "Soothing pastels for peaceful rest and relaxation"
    },
    { 
      entity: "scene.family_fun", 
      name: "Family Fun", 
      icon: "users", 
      description: "Bright and cheerful setting for family activities"
    },
    { 
      entity: "scene.smart_chill", 
      name: "Smart Chill", 
      icon: "laptop", 
      description: "Modern mood with ambient electronic soundscapes"
    },
    { 
      entity: "scene.focus_mode", 
      name: "Focus Mode", 
      icon: "focus", 
      description: "Clear, productive environment for work or study"
    }
  ],
  bathroom: {
    lights: [
      { entity: "light.bathroom_main", name: "Main Light", type: "temperature", supports_temperature: true },
      { entity: "light.bathroom_mirror", name: "Mirror Light", type: "temperature", supports_temperature: true }
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
    { entity: "switch.dnd", name: "Do Not Disturb", icon: "moon" }
  ]
};

export const ROOM_101: RoomConfig = {
  ...ROOM_202,
  room_name: "Executive Suite 101"
};