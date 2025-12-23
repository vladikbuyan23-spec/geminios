
import React, { useEffect, useRef } from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const iconRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const win = window as any;
    if (win.lucide) {
      try {
        win.lucide.createIcons();
      } catch (err) {
        console.warn("Lucide Icon Error:", err);
      }
    }
  }, [name]);

  // Fallback for missing icon names
  const safeName = name || 'help-circle';

  return (
    <i 
      data-lucide={safeName} 
      className={className} 
      style={{ width: size, height: size }}
      ref={iconRef}
    />
  );
};

export default Icon;
