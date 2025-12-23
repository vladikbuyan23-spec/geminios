
import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import { SystemSettings } from '../types';

interface SettingsProps {
  settings: SystemSettings;
  onUpdate: (s: SystemSettings) => void;
  initialPage?: 'main' | 'wallpaper' | 'wifi' | 'bluetooth';
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate, initialPage = 'main' }) => {
  const [view, setView] = useState<'main' | 'wallpaper' | 'wifi' | 'bluetooth'>(initialPage);

  useEffect(() => {
    setView(initialPage);
  }, [initialPage]);

  const update = (key: keyof SystemSettings, val: any) => {
    onUpdate({ ...settings, [key]: val });
  };

  const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-blue-500' : 'bg-white/10'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  );

  const wallpapers = [
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2070',
  ];

  const wifiNetworks = [
    { name: 'Gemini_Enterprise_5G', secure: true, strength: 4, connected: true },
    { name: 'Neural_Node_B7', secure: true, strength: 3, connected: false },
    { name: 'Starlink_Architect', secure: true, strength: 2, connected: false },
    { name: 'Public_Guest_OS', secure: false, strength: 1, connected: false },
    { name: 'Home_Sync_2.4', secure: true, strength: 3, connected: false },
  ];

  const btDevices = [
    { name: 'Gemini Buds Pro', connected: true, battery: '80%', type: 'headphones' },
    { name: 'Architect Watch Ultra', connected: false, battery: '45%', type: 'watch' },
    { name: 'Neural Keyboard 2', connected: false, battery: '100%', type: 'keyboard' },
    { name: 'Desktop Sync', connected: false, battery: 'N/A', type: 'laptop' },
  ];

  if (view === 'wallpaper') {
    return (
      <div className="h-full bg-slate-950 p-6 flex flex-col animate-fade-in overflow-hidden">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={() => setView('main')}><Icon name="arrow-left" className="text-white" /></button>
          <h2 className="text-white text-xl font-bold">Choose Wallpaper</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 overflow-y-auto pb-20 scrollbar-hide">
          {wallpapers.map((wp, i) => (
            <button 
              key={i} 
              onClick={() => update('wallpaper', wp)} 
              className={`aspect-[9/16] rounded-2xl overflow-hidden border-2 transition-all active:scale-95 ${settings.wallpaper === wp ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-transparent opacity-60'}`}
            >
              <img src={wp} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'wifi') {
    return (
      <div className="h-full bg-slate-950 p-6 flex flex-col animate-fade-in overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button onClick={() => setView('main')}><Icon name="arrow-left" className="text-white" /></button>
            <h2 className="text-white text-xl font-bold">Wi-Fi</h2>
          </div>
          <Toggle active={settings.wifi} onToggle={() => update('wifi', !settings.wifi)} />
        </div>
        
        {settings.wifi ? (
          <div className="space-y-4 overflow-y-auto pb-10 scrollbar-hide">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-2">Available Networks</p>
            <div className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
              {wifiNetworks.map((net, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 active:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <Icon name="wifi" size={18} className={net.connected ? 'text-blue-400' : 'text-slate-500'} />
                    <div>
                      <p className={`text-sm font-medium ${net.connected ? 'text-blue-400' : 'text-white'}`}>{net.name}</p>
                      {net.connected && <p className="text-[10px] text-blue-400/60">Connected</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {net.secure && <Icon name="lock" size={12} className="text-slate-600" />}
                    <Icon name="info" size={16} className="text-slate-600" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 pt-4 animate-pulse">Scanning for new nodes...</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-40">
            <Icon name="wifi-off" size={48} className="text-slate-500 mb-4" />
            <p className="text-slate-400 text-sm">Wi-Fi is off</p>
          </div>
        )}
      </div>
    );
  }

  if (view === 'bluetooth') {
    return (
      <div className="h-full bg-slate-950 p-6 flex flex-col animate-fade-in overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button onClick={() => setView('main')}><Icon name="arrow-left" className="text-white" /></button>
            <h2 className="text-white text-xl font-bold">Bluetooth</h2>
          </div>
          <Toggle active={settings.bluetooth} onToggle={() => update('bluetooth', !settings.bluetooth)} />
        </div>
        
        {settings.bluetooth ? (
          <div className="space-y-4 overflow-y-auto pb-10 scrollbar-hide">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-2">Paired Devices</p>
            <div className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
              {btDevices.map((dev, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 active:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <Icon name={dev.type === 'headphones' ? 'headphones' : 'bluetooth'} size={18} className={dev.connected ? 'text-blue-400' : 'text-slate-500'} />
                    <div>
                      <p className={`text-sm font-medium ${dev.connected ? 'text-blue-400' : 'text-white'}`}>{dev.name}</p>
                      <p className="text-[10px] text-slate-500">{dev.connected ? 'Connected' : 'Disconnected'} • {dev.battery}</p>
                    </div>
                  </div>
                  <Icon name="settings" size={16} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-40">
            <Icon name="bluetooth" size={48} className="text-slate-500 mb-4" />
            <p className="text-slate-400 text-sm">Bluetooth is off</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-950 overflow-y-auto pb-20 animate-fade-in scrollbar-hide">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div className="bg-white/5 rounded-3xl p-2 border border-white/5">
            <div onClick={() => setView('wifi')} className="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white"><Icon name="wifi" size={20} /></div>
                <span className="text-white font-medium">Wi-Fi</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500">{settings.wifi ? 'Connected' : 'Off'}</span>
                <Icon name="chevron-right" size={16} className="text-slate-700" />
              </div>
            </div>
            <div onClick={() => setView('bluetooth')} className="flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white"><Icon name="bluetooth" size={20} /></div>
                <span className="text-white font-medium">Bluetooth</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500">{settings.bluetooth ? 'On' : 'Off'}</span>
                <Icon name="chevron-right" size={16} className="text-slate-700" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-3xl p-2 border border-white/5">
             <button onClick={() => setView('wallpaper')} className="w-full flex items-center justify-between p-4 active:bg-white/5 rounded-3xl">
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white"><Icon name="image" size={20} /></div>
                 <span className="text-white font-medium">Appearance</span>
               </div>
               <Icon name="chevron-right" className="text-slate-500" />
             </button>
          </div>

          <div className="bg-white/5 rounded-3xl p-4 border border-white/5 text-white">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 ml-2">Display & Brightness</h3>
            <div className="flex items-center space-x-4">
              <Icon name="sun" size={16} className="text-slate-400" />
              <input 
                type="range" 
                className="flex-1 accent-blue-500 h-1.5 bg-white/10 rounded-full appearance-none" 
                value={settings.brightness} 
                onChange={(e) => update('brightness', parseInt(e.target.value))}
              />
              <span className="text-xs w-8 text-right font-mono">{settings.brightness}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
