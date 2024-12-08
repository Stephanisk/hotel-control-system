import React from 'react';
import { Lightbulb } from 'lucide-react';
import type { Light } from '../../types/room';
import { useEntityStore } from '../../store/entityStore';
import { callService } from '../../services/haApi';

interface Props {
  light: Light;
}

export function SimpleLight({ light }: Props) {
  const currentRoom = useEntityStore(state => state.currentRoom);
  const entity = useEntityStore(state => state.getEntity(light.entity));
  const isOn = entity?.state === 'on';

  const handleToggle = () => {
    callService(currentRoom, 'light', isOn ? 'turn_off' : 'turn_on', {
      entity_id: light.entity
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
          <h3 className="text-lg font-medium">{light.name}</h3>
        </div>
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isOn ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
      </div>
    </div>
  );
}