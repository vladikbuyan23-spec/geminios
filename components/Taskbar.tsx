
import React from 'react';
import Icon from './Icon';
import { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  onToggleWindow: (id: any) => void;
  activeWindowId: string | null;
  onOpenStartMenu: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onToggleWindow, activeWindowId, onOpenStartMenu }) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 glass flex items-center justify-between px-4 z-[9999] select-none">
      <div className="flex items-center space-x-2">
        <button 
          onClick={onOpenStartMenu}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <Icon name="layout-grid" className="text-blue-400 group-hover:scale-110 transition-transform" size={24} />
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-2" />
        
        <div className="flex items-center space-x-1">
          {windows.map(w => w.isOpen && (
            <button
              key={w.id}
              onClick={() => onToggleWindow(w.id)}
              className={`p-2 rounded-lg transition-all flex items-center space-x-2 ${
                activeWindowId === w.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Icon name={w.icon} size={20} className={activeWindowId === w.id ? 'text-blue-400' : 'text-slate-300'} />
              <div className={`w-1 h-1 rounded-full bg-blue-400 ${activeWindowId === w.id ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-slate-300">
        <div className="flex items-center space-x-2 px-3 py-1 hover:bg-white/10 rounded-lg cursor-default">
          <Icon name="wifi" size={16} />
          <Icon name="volume-2" size={16} />
          <Icon name="battery" size={16} />
        </div>
        <div className="flex flex-col items-end text-xs font-medium cursor-default">
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
