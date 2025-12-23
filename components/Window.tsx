
import React from 'react';
import Icon from './Icon';
import { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}

const Window: React.FC<WindowProps> = ({ window, children, onClose, onMinimize, onMaximize, onFocus }) => {
  if (!window.isOpen || window.isMinimized) return null;

  const maximizedClasses = window.isMaximized 
    ? 'inset-0 w-full h-full' 
    : 'top-10 left-10 md:top-20 md:left-20 w-[90vw] h-[70vh] md:w-[800px] md:h-[600px]';

  return (
    <div 
      onClick={onFocus}
      className={`fixed z-[${window.zIndex}] glass-dark rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${maximizedClasses}`}
      style={{ zIndex: window.zIndex }}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 cursor-default select-none group">
        <div className="flex items-center space-x-2">
          <Icon name={window.icon} size={16} className="text-blue-400" />
          <span className="text-sm font-medium text-slate-300">{window.title}</span>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="hover:text-slate-100 text-slate-500 transition-colors">
            <Icon name="minus" size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="hover:text-slate-100 text-slate-500 transition-colors">
            <Icon name={window.isMaximized ? "shrink" : "expand"} size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="hover:text-red-400 text-slate-500 transition-colors">
            <Icon name="x" size={16} />
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Window;
