// Dummy placeholders
const HA_BASE_URL = "http://dummy-ha-url";
const HA_TOKEN = "DUMMY_TOKEN";

// Fake states object for multiple rooms
const FAKE_STATES_PER_ROOM = {
  '202': {
    "light.chandelier": { 
      entity_id: "light.chandelier", 
      state: "off", 
      attributes: { 
        brightness: 255,
        rgb_color: [255, 255, 255],
        color_temp: 400
      }
    },
    "light.bedside_left": {
      entity_id: "light.bedside_left",
      state: "off",
      attributes: {
        brightness: 255,
        color_temp: 400
      }
    },
    "light.bedside_right": {
      entity_id: "light.bedside_right",
      state: "off",
      attributes: {
        brightness: 255,
        color_temp: 400
      }
    }
  }
};

// Create a deep copy for current states
let currentStatesPerRoom = JSON.parse(JSON.stringify(FAKE_STATES_PER_ROOM));

export async function fetchRoomStates(roomId: string): Promise<EntityState[]> {
  const roomStates = currentStatesPerRoom[roomId];
  if (!roomStates) {
    console.warn(`No states found for ${roomId}. Returning empty array.`);
    return [];
  }
  return Object.values(roomStates);
}

export async function callService(
  roomId: string,
  domain: string,
  service: string,
  payload: ServiceCallPayload
): Promise<{ result: string }> {
  console.log(`Called service: ${domain}.${service} for ${roomId}`, payload);
  
  const roomStates = currentStatesPerRoom[roomId];
  if (!roomStates || !roomStates[payload.entity_id]) {
    console.warn(`Entity ${payload.entity_id} not found in ${roomId}`);
    return { result: "error" };
  }

  // Create a deep copy of the current state
  const newStates = JSON.parse(JSON.stringify(currentStatesPerRoom));
  const currentState = newStates[roomId][payload.entity_id];

  if (domain === 'light') {
    if (service === 'turn_on') {
      currentState.state = 'on';
      if (payload.brightness !== undefined) {
        currentState.attributes.brightness = payload.brightness;
      }
      if (payload.rgb_color !== undefined) {
        currentState.attributes.rgb_color = payload.rgb_color;
      }
      if (payload.color_temp !== undefined) {
        currentState.attributes.color_temp = payload.color_temp;
      }
    } else if (service === 'turn_off') {
      currentState.state = 'off';
    }
  }

  // Update the state atomically
  currentStatesPerRoom = newStates;

  // Notify subscribers immediately
  const subscribers = (window as any).__haSocketSubscribers || [];
  subscribers.forEach((callback: Function) => {
    callback(payload.entity_id, currentState);
  });

  return { result: "ok" };
}

export type ServiceCallPayload = {
  entity_id: string;
  [key: string]: any;
};

export type EntityState = {
  entity_id: string;
  state: string;
  attributes?: {
    brightness?: number;
    rgb_color?: [number, number, number];
    color_temp?: number;
    [key: string]: any;
  };
};

export { currentStatesPerRoom };