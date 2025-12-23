
import React, { useState } from 'react';
import Icon from '../components/Icon';

interface BrowserProps {
  initialUrl?: string;
}

const Browser: React.FC<BrowserProps> = ({ initialUrl = 'https://www.google.com' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = inputUrl;
    if (!targetUrl.startsWith('http')) {
      targetUrl = `https://${targetUrl}`;
    }
    setUrl(targetUrl);
  };

  return (
    <div className="h-full bg-slate-900 flex flex-col">
      {/* URL Bar */}
      <div className="p-4 bg-slate-900 border-b border-white/5 flex items-center space-x-3">
        <div className="flex items-center space-x-4 text-white/50 px-2">
          <Icon name="chevron-left" size={20} />
          <Icon name="rotate-cw" size={18} />
        </div>
        <form onSubmit={handleGo} className="flex-1">
          <div className="bg-white/5 border border-white/10 rounded-full h-10 flex items-center px-4 space-x-2">
            <Icon name="lock" size={12} className="text-emerald-500" />
            <input 
              type="text" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="bg-transparent text-white text-xs w-full outline-none"
            />
          </div>
        </form>
        <Icon name="more-vertical" size={20} className="text-white/50" />
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-white relative">
        <iframe 
          src={url} 
          className="absolute inset-0 w-full h-full border-none"
          title="Browser View"
        />
        {/* Placeholder overlay if iframes are blocked by some sites */}
        <div className="hidden absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center p-10">
          <Icon name="shield-alert" size={48} className="text-red-500 mb-4" />
          <p className="text-white font-bold mb-2">Security Restriction</p>
          <p className="text-slate-400 text-sm">To access {url}, please open in a dedicated neural node.</p>
        </div>
      </div>
    </div>
  );
};

export default Browser;
