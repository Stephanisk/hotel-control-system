import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { TabNavigation } from './components/TabNavigation';
import { Overview } from './components/Overview';
import { LightingTab } from './components/lighting/LightingTab';
import { ClimateTab } from './components/climate/ClimateTab';
import { AudioTab } from './components/audio/AudioTab';
import { ScenesTab } from './components/scenes/ScenesTab';
import { getRoomConfig } from './lib/roomManager';
import { useEntityStore } from './store/entityStore';

const DEFAULT_ROOM = '202';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const roomConfig = getRoomConfig(DEFAULT_ROOM);
  const initializeStore = useEntityStore(state => state.initializeStore);
  const setCurrentRoom = useEntityStore(state => state.setCurrentRoom);

  useEffect(() => {
    setCurrentRoom(DEFAULT_ROOM);
    initializeStore(DEFAULT_ROOM);
  }, [initializeStore, setCurrentRoom]);

  if (!roomConfig) {
    return <div>Room configuration not found</div>;
  }

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-text">
      <header className="relative bg-luxury-bg-dark border-b border-luxury-accent/20 py-8 overflow-hidden">
        {/* Baroque Pattern Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23DAA520' stroke-width='1'%3E%3Cpath d='M25,25 C30,10 40,10 50,25 C60,40 70,40 75,25 M25,75 C30,90 40,90 50,75 C60,60 70,60 75,75 M0,50 C15,45 15,35 0,25 M100,50 C85,45 85,35 100,25 M0,75 C15,70 15,60 0,50 M100,75 C85,70 85,60 100,50'/%3E%3Cpath d='M25,25 C40,30 40,40 25,50 C10,60 10,70 25,75 M75,25 C60,30 60,40 75,50 C90,60 90,70 75,75' transform='rotate(180 50 50)'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            transform: 'rotate(0deg)',
            filter: 'blur(0.5px)'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif text-luxury-text">
                {roomConfig.room_name}
              </h1>
              <div className="h-0.5 w-32 bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-transparent mt-2" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-luxury-gold font-serif text-xl block">
                  Threads of Time
                </span>
                <div className="h-0.5 w-24 bg-gradient-to-l from-luxury-gold via-luxury-gold-light to-transparent mt-1 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="mt-8">
          {activeTab === 'overview' && (
            <Overview 
              config={roomConfig} 
              onNavigate={setActiveTab} 
            />
          )}
          {activeTab === 'lighting' && (
            <LightingTab lights={roomConfig.lights} />
          )}
          {activeTab === 'climate' && (
            <ClimateTab climate={roomConfig.climate} />
          )}
          {activeTab === 'audio' && (
            <AudioTab audio={roomConfig.audio} />
          )}
          {activeTab === 'scenes' && (
            <ScenesTab scenes={roomConfig.scenes} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;