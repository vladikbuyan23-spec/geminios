
import React from 'react';
import Icon from './Icon';

interface NavigationBarProps {
  onHome: () => void;
  onBack: () => void;
  onRecents: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onHome, onBack, onRecents }) => {
  return (
    <div className="h-16 bg-black/40 backdrop-blur-3xl flex items-center justify-around px-8 z-[1000] pb-safe border-t border-white/5">
      <button onClick={onBack} className="p-4 text-white/50 hover:text-white active:scale-90 transition-all">
        <Icon name="chevron-left" size={26} />
      </button>
      <button onClick={onHome} className="p-4 text-white/90 hover:text-white active:scale-90 transition-all">
        <div className="w-5 h-5 rounded-full border-[2.5px] border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
      </button>
      <button onClick={onRecents} className="p-4 text-white/50 hover:text-white active:scale-90 transition-all">
        <div className="w-5 h-5 rounded-[4px] border-[2.5px] border-white" />
      </button>
    </div>
  );
};

export default NavigationBar;
