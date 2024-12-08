import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import type { Light } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  light: Light;
}

export function RGBControls({ light }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(light.entity));
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [localColor, setLocalColor] = useState(() => {
    const rgbColor = entity?.attributes?.rgb_color ?? [255, 255, 255];
    return rgbToHex(rgbColor);
  });

  // Update local color when entity state changes
  useEffect(() => {
    const rgbColor = entity?.attributes?.rgb_color ?? [255, 255, 255];
    setLocalColor(rgbToHex(rgbColor));
  }, [entity?.attributes?.rgb_color]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  const handleColorChange = (color: string) => {
    setLocalColor(color);  // Immediately updates UI
    callService(currentRoom, 'light', 'turn_on', {
      entity_id: light.entity,
      rgb_color: hexToRgb(color)
    });
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-luxury-text mb-2">
        Color
      </label>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-full h-10 rounded-lg border border-luxury-accent/20 transition-all duration-200 hover:shadow-luxury"
        style={{ backgroundColor: localColor }}
      />
      {showPicker && (
        <div 
          ref={pickerRef}
          className="absolute mt-2 z-10 bg-luxury-bg-light p-3 rounded-lg shadow-luxury border border-luxury-accent/20"
        >
          <HexColorPicker color={localColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null;
}

function rgbToHex([r, g, b]: number[]): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}