
import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface StatusBarProps {
  wifi?: boolean;
  bluetooth?: boolean;
  airplane?: boolean;
  onClick?: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ wifi = true, bluetooth = false, airplane = false, onClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      onClick={onClick}
      className="h-9 px-6 flex items-center justify-between text-white text-[12px] font-semibold select-none z-[1000] pt-safe bg-transparent active:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex items-center space-x-1">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      {/* Центрированная "челка" или индикатор для красоты */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-20 h-5 bg-black rounded-full border border-white/10 hidden md:block" />

      <div className="flex items-center space-x-2">
        {airplane && <Icon name="plane" size={12} />}
        {!airplane && wifi && <Icon name="wifi" size={13} />}
        {!airplane && bluetooth && <Icon name="bluetooth" size={13} />}
        <Icon name="signal" size={13} />
        <div className="flex items-center space-x-1">
          <span className="text-[10px]">88%</span>
          <div className="w-5 h-2.5 border border-white/40 rounded-sm relative p-[1px]">
             <div className="h-full bg-white rounded-[1px] w-[88%] shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
