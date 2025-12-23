
import React from 'react';
import Icon from './Icon';
import { HomeWidget } from '../types';

interface WidgetAreaProps {
  widgets: HomeWidget[];
  onRemove: (id: string) => void;
}

const WidgetArea: React.FC<WidgetAreaProps> = ({ widgets, onRemove }) => {
  const renderWidget = (widget: HomeWidget) => {
    switch (widget.type) {
      case 'clock':
        return (
          <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 flex flex-col items-center justify-center min-w-[140px] relative group">
            <span className="text-4xl font-light text-white font-mono">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
            <span className="text-[10px] text-blue-400 font-bold uppercase mt-1">Neural Time</span>
            <button 
              onClick={() => onRemove(widget.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="x" size={12} />
            </button>
          </div>
        );
      case 'weather':
        return (
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 flex items-center space-x-4 min-w-[180px] relative group">
            <Icon name="cloud-sun" size={32} className="text-yellow-400" />
            <div>
              <span className="text-2xl font-bold text-white block">24°C</span>
              <span className="text-[10px] text-white/60 uppercase">San Francisco</span>
            </div>
            <button 
              onClick={() => onRemove(widget.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="x" size={12} />
            </button>
          </div>
        );
      case 'search':
        return (
          <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-4 border border-white/10 flex items-center space-x-3 w-full max-w-sm relative group">
            <Icon name="search" size={18} className="text-white/40" />
            <span className="text-white/40 text-sm">Search the multiverse...</span>
            <button 
              onClick={() => onRemove(widget.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="x" size={12} />
            </button>
          </div>
        );
      case 'stats':
        return (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-4 border border-white/10 min-w-[140px] relative group">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-white/40 uppercase">CPU</span>
                <span className="text-[9px] font-bold text-emerald-400">12%</span>
             </div>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-emerald-400 w-[12%]" />
             </div>
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-white/40 uppercase">Neural</span>
                <span className="text-[9px] font-bold text-blue-400">84%</span>
             </div>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[84%]" />
             </div>
             <button 
              onClick={() => onRemove(widget.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="x" size={12} />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {widgets.map(w => (
        <div key={w.id} className="animate-fade-in">
          {renderWidget(w)}
        </div>
      ))}
    </div>
  );
};

export default WidgetArea;
