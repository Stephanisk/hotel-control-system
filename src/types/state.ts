export interface EntityState {
  entity_id: string;
  state: string;
  attributes?: {
    brightness?: number;
    temperature?: number;
    volume_level?: number;
    [key: string]: any;
  };
}