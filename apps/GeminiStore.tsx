
import React from 'react';
import Icon from '../components/Icon';

interface GeminiStoreProps {
  onOpenApp: (id: string, url?: string) => void;
}

const GeminiStore: React.FC<GeminiStoreProps> = ({ onOpenApp }) => {
  const featured = [
    { id: 'tiktok', title: 'TikTok', desc: 'Real-time neural shorts', icon: 'video', color: 'bg-black', rating: '4.8', url: 'https://www.tiktok.com' },
    { id: 'assistant', title: 'Gemini Assistant', desc: 'Powerful LLM intelligence', icon: 'bot', color: 'bg-blue-500', rating: '4.9' },
  ];

  const categories = [
    { title: 'Popular Marketplace', apps: [
      { id: 'wildberries', title: 'Wildberries', icon: 'shopping-cart', color: 'bg-purple-700', url: 'https://www.wildberries.ru' },
      { id: 'aliexpress', title: 'AliExpress', icon: 'package', color: 'bg-orange-600', url: 'https://www.aliexpress.com' },
      { id: 'amazon', title: 'Amazon', icon: 'truck', color: 'bg-amber-600', url: 'https://www.amazon.com' },
    ]},
    { title: 'Social & Media', apps: [
      { id: 'telegram', title: 'Telegram', icon: 'send', color: 'bg-blue-400', url: 'https://web.telegram.org' },
      { id: 'youtube', title: 'YouTube', icon: 'youtube', color: 'bg-red-600', url: 'https://www.youtube.com' },
      { id: 'spotify', title: 'Spotify', icon: 'music', color: 'bg-emerald-500', url: 'https://open.spotify.com' },
    ]},
    { title: 'AI Tools', apps: [
      { id: 'image-gen', title: 'Vision Studio', icon: 'image', color: 'bg-purple-500' },
      { id: 'notes', title: 'Neural Notes', icon: 'file-text', color: 'bg-amber-500' },
    ]}
  ];

  return (
    <div className="h-full bg-slate-950 flex flex-col overflow-y-auto">
      {/* Search Header */}
      <div className="p-6 pb-2 sticky top-0 bg-slate-950 z-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl h-12 flex items-center px-4 mb-4">
          <Icon name="search" size={18} className="text-slate-400 mr-2" />
          <span className="text-slate-400 text-sm">Search apps & games</span>
        </div>
        <div className="flex space-x-6 text-sm font-bold border-b border-white/5 pb-2">
          <span className="text-blue-400 border-b-2 border-blue-400 pb-2 px-1">For you</span>
          <span className="text-slate-500 px-1">Top charts</span>
          <span className="text-slate-500 px-1">Categories</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="p-6">
        <h2 className="text-white font-bold mb-4">Trending Now</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {featured.map(app => (
            <div key={app.id} className="min-w-[280px] bg-white/5 rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className={`${app.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Icon name={app.icon} className="text-white" size={28} />
                </div>
                <div className="flex items-center text-xs text-yellow-500 font-bold bg-yellow-500/10 px-2 py-1 rounded-full">
                  <Icon name="star" size={12} className="mr-1 fill-yellow-500" />
                  {app.rating}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-bold">{app.title}</h3>
                <p className="text-slate-400 text-xs">{app.desc}</p>
                <button 
                  onClick={() => onOpenApp(app.id, app.url)}
                  className="mt-4 w-full py-2 bg-blue-600 rounded-xl text-white text-xs font-bold hover:bg-blue-500 transition-colors"
                >
                  Install / Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-6 space-y-8 pb-10">
        {categories.map(cat => (
          <div key={cat.title}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">{cat.title}</h2>
              <Icon name="chevron-right" size={20} className="text-slate-500" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {cat.apps.map(app => (
                <div key={app.id} onClick={() => onOpenApp(app.id, app.url)} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`${app.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon name={app.icon} className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{app.title}</h4>
                      <p className="text-slate-500 text-[10px]">Optimized for GeminiOS</p>
                    </div>
                  </div>
                  <button className="px-6 py-1 bg-white/10 rounded-full text-blue-400 text-xs font-bold group-active:scale-95 transition-all">
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeminiStore;
