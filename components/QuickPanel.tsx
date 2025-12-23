
import React from 'react';
import Icon from './Icon';
import { SystemSettings, OSNotification } from '../types';

interface QuickPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettings;
  onUpdateSettings: (s: SystemSettings) => void;
  notifications: OSNotification[];
  onClearNotifications: () => void;
  onOpenSettings: (page: 'main' | 'wallpaper' | 'wifi' | 'bluetooth') => void;
}

const QuickPanel: React.FC<QuickPanelProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  notifications,
  onClearNotifications,
  onOpenSettings
}) => {
  const update = (key: keyof SystemSettings, val: any) => {
    onUpdateSettings({ ...settings, [key]: val });
  };

  const QuickToggle = ({ icon, label, active, onIconClick, onLabelClick, color = "bg-blue-500" }: any) => (
    <div className="flex flex-col items-center space-y-2">
      <button 
        onClick={onIconClick}
        className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all active:scale-90 ${active ? color : 'bg-white/10 text-white/30 border border-white/5'}`}
      >
        <Icon name={icon} size={28} />
      </button>
      <button 
        onClick={onLabelClick || onIconClick}
        className="flex items-center space-x-1 active:opacity-50"
      >
        <span className="text-[11px] font-bold text-white/60 tracking-tight">{label}</span>
        {onLabelClick && <Icon name="chevron-right" size={10} className="text-white/20" />}
      </button>
    </div>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[1999] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed inset-x-0 top-0 h-[92vh] z-[2000] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="h-full bg-black/70 backdrop-blur-3xl px-6 pt-12 pb-10 flex flex-col rounded-b-[3rem] border-b border-white/10 shadow-2xl">
          <div className="flex justify-center mb-8">
            <button onClick={onClose} className="w-16 h-1.5 bg-white/30 rounded-full active:bg-white/50 transition-colors" />
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <div className="grid grid-cols-4 gap-y-7 gap-x-4 mb-10">
              <QuickToggle 
                icon="wifi" 
                label="Wi-Fi" 
                active={settings.wifi && !settings.airplaneMode} 
                onIconClick={() => update('wifi', !settings.wifi)}
                onLabelClick={() => onOpenSettings('wifi')}
              />
              <QuickToggle 
                icon="bluetooth" 
                label="BT" 
                active={settings.bluetooth && !settings.airplaneMode} 
                onIconClick={() => update('bluetooth', !settings.bluetooth)} 
                onLabelClick={() => onOpenSettings('bluetooth')}
                color="bg-indigo-600" 
              />
              <QuickToggle 
                icon="plane" 
                label="Mode" 
                active={settings.airplaneMode} 
                onIconClick={() => update('airplaneMode', !settings.airplaneMode)} 
                color="bg-orange-600" 
              />
              <QuickToggle 
                icon="moon" 
                label="Night" 
                active={settings.darkMode} 
                onIconClick={() => update('darkMode', !settings.darkMode)} 
                color="bg-slate-800" 
              />
              <QuickToggle icon="flashlight" label="Torch" active={false} onIconClick={() => {}} color="bg-yellow-500" />
              <QuickToggle icon="bell-off" label="Silent" active={false} onIconClick={() => {}} color="bg-red-500" />
              <QuickToggle icon="map-pin" label="GPS" active={true} onIconClick={() => {}} color="bg-emerald-600" />
              <QuickToggle icon="rotate-cw" label="Auto" active={true} onIconClick={() => {}} color="bg-blue-400" />
            </div>

            <div className="space-y-7 mb-10">
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center space-x-4">
                <Icon name="sun" size={20} className="text-white/40" />
                <input type="range" className="flex-1 accent-white h-2 rounded-full appearance-none bg-white/10" value={settings.brightness} onChange={(e) => update('brightness', parseInt(e.target.value))} />
                <span className="text-[10px] font-mono text-white/40 w-6">{settings.brightness}%</span>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center space-x-4">
                <Icon name="volume-2" size={20} className="text-white/40" />
                <input type="range" className="flex-1 accent-white h-2 rounded-full appearance-none bg-white/10" value={settings.volume} onChange={(e) => update('volume', parseInt(e.target.value))} />
                <span className="text-[10px] font-mono text-white/40 w-6">{settings.volume}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-sm">Notifications</h3>
                <button onClick={onClearNotifications} className="text-blue-400 text-xs font-bold bg-blue-400/10 px-3 py-1 rounded-full">Clear all</button>
              </div>
              
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-white/10">
                  <Icon name="bell-off" size={48} className="mx-auto mb-3 opacity-20" />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black">All caught up</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} className="bg-white/5 border border-white/10 rounded-[1.8rem] p-5 flex items-start space-x-4 mb-3">
                    <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-white/80 shrink-0">
                      <Icon name={notif.icon} size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{notif.app}</span>
                        <span className="text-[9px] text-white/30">{notif.time}</span>
                      </div>
                      <h4 className="text-white text-[14px] font-bold truncate mb-0.5">{notif.title}</h4>
                      <p className="text-white/50 text-[13px] leading-snug line-clamp-2">{notif.body}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="h-10 w-full flex items-center justify-center mt-auto cursor-pointer" onClick={onClose}>
             <Icon name="chevron-up" className="text-white/20 animate-bounce" size={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickPanel;
