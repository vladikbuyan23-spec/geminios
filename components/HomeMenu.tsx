
import React from 'react';
import Icon from './Icon';

interface HomeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: 'wallpaper' | 'widgets' | 'settings') => void;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ isOpen, onClose, onSelectAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-end justify-center px-4 pb-20 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl flex justify-around">
        <button 
          onClick={() => onSelectAction('wallpaper')}
          className="flex flex-col items-center space-y-2 group"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white group-active:scale-90 transition-transform">
            <Icon name="image" size={24} />
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Wallpaper</span>
        </button>

        <button 
          onClick={() => onSelectAction('widgets')}
          className="flex flex-col items-center space-y-2 group"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white group-active:scale-90 transition-transform">
            <Icon name="layout" size={24} />
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Widgets</span>
        </button>

        <button 
          onClick={() => onSelectAction('settings')}
          className="flex flex-col items-center space-y-2 group"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white group-active:scale-90 transition-transform">
            <Icon name="settings" size={24} />
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;
