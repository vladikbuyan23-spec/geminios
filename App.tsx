
import React, { useState, useEffect, useRef } from 'react';
import { AppId, AppMetadata, SystemSettings, OSNotification, HomeWidget, WidgetType } from './types';
import StatusBar from './components/StatusBar';
import NavigationBar from './components/NavigationBar';
import Icon from './components/Icon';
import Assistant from './apps/Assistant';
import ImageGen from './apps/ImageGen';
import Terminal from './apps/Terminal';
import Calculator from './apps/Calculator';
import GeminiStore from './apps/GeminiStore';
import Notes from './apps/Notes';
import Settings from './apps/Settings';
import Browser from './apps/Browser';
import NeuralTok from './apps/NeuralTok';
import GeminiGram from './apps/GeminiGram';
import TTMessenger from './apps/TTMessenger';
import QuickPanel from './components/QuickPanel';
import HomeMenu from './components/HomeMenu';
import WidgetArea from './components/WidgetArea';

const APPS: AppMetadata[] = [
  { id: 'assistant', title: 'Assistant', icon: 'bot', color: 'bg-blue-500' },
  { id: 'image-gen', title: 'Vision', icon: 'image', color: 'bg-purple-500' },
  { id: 'tiktok', title: 'NeuralTok', icon: 'video', color: 'bg-zinc-900' },
  { id: 'instagram', title: 'G-Gram', icon: 'instagram', color: 'bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500' },
  { id: 'telegram', title: 'TT-Chat', icon: 'send', color: 'bg-sky-500' },
  { id: 'store', title: 'Store', icon: 'shopping-bag', color: 'bg-emerald-500' },
  { id: 'calculator', title: 'Calc', icon: 'calculator', color: 'bg-slate-700' },
  { id: 'notes', title: 'Notes', icon: 'file-text', color: 'bg-amber-500' },
  { id: 'browser', title: 'Chrome', icon: 'globe', color: 'bg-blue-400' },
  { id: 'settings', title: 'Settings', icon: 'settings', color: 'bg-slate-500' },
];

const App: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<'hardware' | 'os' | 'ready'>('hardware');
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [settingsPage, setSettingsPage] = useState<'main' | 'wallpaper' | 'wifi' | 'bluetooth'>('main');
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [widgets, setWidgets] = useState<HomeWidget[]>([
    { id: 'w1', type: 'clock' },
    { id: 'w2', type: 'weather' }
  ]);
  
  const longPressTimer = useRef<any>(null);
  const touchStartY = useRef<number>(0);

  const [notifications, setNotifications] = useState<OSNotification[]>([
    { id: '1', title: 'NeuralCore Update', body: 'System version 1.5.2 installed.', app: 'System', time: 'Just now', icon: 'cpu' },
    { id: '2', title: 'New Message', body: 'Architect: Ready for mobile?', app: 'TT Messenger', time: '5m ago', icon: 'message-circle' },
  ]);

  const [settings, setSettings] = useState<SystemSettings>({
    wifi: true,
    bluetooth: false,
    airplaneMode: false,
    darkMode: true,
    volume: 80,
    brightness: 90,
    wallpaper: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2070'
  });

  useEffect(() => {
    const hardwareTimer = setTimeout(() => setBootPhase('os'), 3200);
    const osTimer = setTimeout(() => setBootPhase('ready'), 7500);
    return () => { clearTimeout(hardwareTimer); clearTimeout(osTimer); };
  }, []);

  const openSettings = (page: 'main' | 'wallpaper' | 'wifi' | 'bluetooth' = 'main') => {
    setSettingsPage(page);
    setActiveAppId('settings');
    setIsQuickPanelOpen(false);
    setIsHomeMenuOpen(false);
  };

  const handleStartPress = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeAppId || isQuickPanelOpen || bootPhase !== 'ready') return;
    longPressTimer.current = window.setTimeout(() => {
      setIsHomeMenuOpen(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    }, 500);
  };

  const handleEndPress = () => {
    if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const handleHomeMenuAction = (action: 'wallpaper' | 'widgets' | 'settings') => {
    if (action === 'wallpaper') {
      openSettings('wallpaper');
    } else if (action === 'settings') {
      openSettings('main');
    } else if (action === 'widgets') {
      const types: WidgetType[] = ['clock', 'weather', 'search', 'stats'];
      const nextType = types[widgets.length % types.length];
      const newWidget: HomeWidget = { id: Date.now().toString(), type: nextType };
      setWidgets([...widgets, newWidget]);
      setIsHomeMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (bootPhase !== 'ready') return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY.current;

      if (diff > 50 && touchStartY.current < 100 && !isQuickPanelOpen && !activeAppId) {
        setIsQuickPanelOpen(true);
      }
      
      if (diff < -80 && touchStartY.current > window.innerHeight - 100 && activeAppId) {
        setActiveAppId(null);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeAppId, isQuickPanelOpen, bootPhase]);

  const renderApp = () => {
    if (!activeAppId) return null;

    return (
      <div className={`absolute inset-0 z-50 animate-fade-in flex flex-col pt-safe ${settings.darkMode ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="flex-1 overflow-hidden">
          {(() => {
            switch (activeAppId) {
              case 'assistant': return <Assistant />;
              case 'image-gen': return <ImageGen />;
              case 'tiktok': return <NeuralTok />;
              case 'instagram': return <GeminiGram />;
              case 'telegram': return <TTMessenger />;
              case 'store': return <GeminiStore onOpenApp={(id) => setActiveAppId(id as any)} />;
              case 'calculator': return <Calculator />;
              case 'notes': return <Notes />;
              case 'terminal': return <Terminal />;
              case 'browser': return <Browser />;
              case 'settings': return <Settings settings={settings} onUpdate={setSettings} initialPage={settingsPage} />;
              default: return null;
            }
          })()}
        </div>
      </div>
    );
  };

  if (bootPhase !== 'ready') {
    return (
      <div className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center overflow-hidden">
        {bootPhase === 'hardware' && (
          <div className="animate-boot-hardware flex flex-col items-center">
            <h1 className="text-white text-5xl font-bold uppercase tracking-[0.4em] animate-hardware-glow">geminifon</h1>
            <div className="h-px w-24 bg-white/20 mt-6 shadow-[0_0_15px_white]" />
            <p className="text-white/40 text-[10px] mt-6 uppercase tracking-[0.3em] font-medium">Powered by Neural Core</p>
          </div>
        )}
        {bootPhase === 'os' && (
          <div className="animate-boot-os flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(37,99,235,0.5)] border border-blue-400/30">
              <Icon name="bot" size={48} className="text-white" />
            </div>
            <h1 className="gemini-gradient-text text-5xl font-black italic tracking-tighter">geminios</h1>
            <div className="mt-10 flex space-x-3">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-screen h-screen flex flex-col overflow-hidden transition-colors duration-500 animate-desktop-reveal ${settings.darkMode ? 'bg-black' : 'bg-slate-200'}`}>
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${activeAppId ? 'scale-110 blur-2xl opacity-40' : 'scale-100 opacity-100'}`}
        style={{ backgroundImage: `url("${settings.wallpaper}")` }}
        onMouseDown={handleStartPress}
        onMouseUp={handleEndPress}
        onTouchStart={handleStartPress}
        onTouchEnd={handleEndPress}
      />

      <QuickPanel 
        isOpen={isQuickPanelOpen} 
        onClose={() => setIsQuickPanelOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        notifications={notifications}
        onClearNotifications={() => setNotifications([])}
        onOpenSettings={openSettings}
      />

      <HomeMenu isOpen={isHomeMenuOpen} onClose={() => setIsHomeMenuOpen(false)} onSelectAction={handleHomeMenuAction} />

      <StatusBar 
        wifi={settings.wifi && !settings.airplaneMode} 
        bluetooth={settings.bluetooth && !settings.airplaneMode}
        airplane={settings.airplaneMode}
        onClick={() => !activeAppId && setIsQuickPanelOpen(true)}
      />

      <main className="flex-1 relative z-10 flex flex-col pt-2">
        <div className={`flex-1 px-5 pt-4 transition-all duration-500 overflow-y-auto ${activeAppId || isHomeMenuOpen || isQuickPanelOpen ? 'opacity-0 scale-90 blur-lg pointer-events-none' : 'opacity-100 scale-100'}`}>
          <WidgetArea widgets={widgets} onRemove={removeWidget} />

          <div className="grid grid-cols-4 gap-x-3 gap-y-7 mt-4">
            {APPS.map(app => (
              <button
                key={app.id}
                onClick={() => setActiveAppId(app.id)}
                className="flex flex-col items-center space-y-1.5 group"
              >
                <div className={`${app.color} w-[62px] h-[62px] rounded-[1.3rem] flex items-center justify-center shadow-lg active:scale-90 transition-transform`}>
                  <Icon name={app.icon} className="text-white" size={30} />
                </div>
                <span className={`text-[11px] font-semibold text-center line-clamp-1 drop-shadow-md ${settings.darkMode ? 'text-white' : 'text-slate-900'}`}>{app.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 mb-20">
            <div className={`backdrop-blur-3xl border rounded-3xl h-14 flex items-center px-5 space-x-3 shadow-2xl transition-all ${settings.darkMode ? 'bg-white/10 border-white/10' : 'bg-black/10 border-black/10'}`}>
              <Icon name="search" size={20} className={settings.darkMode ? 'text-white/60' : 'text-slate-900/60'} />
              <input 
                type="text" 
                placeholder="Ask Gemini anything..." 
                className={`bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30 ${settings.darkMode ? 'text-white' : 'text-slate-900'}`}
                onFocus={() => setActiveAppId('assistant')}
              />
              <Icon name="mic" size={20} className="text-blue-400" />
            </div>
          </div>
        </div>

        {renderApp()}
      </main>

      <NavigationBar 
        onHome={() => { setActiveAppId(null); setIsQuickPanelOpen(false); setIsHomeMenuOpen(false); }}
        onBack={() => {
          if (isQuickPanelOpen) setIsQuickPanelOpen(false);
          else if (isHomeMenuOpen) setIsHomeMenuOpen(false);
          else setActiveAppId(null);
        }}
        onRecents={() => {}}
      />
    </div>
  );
};

export default App;
