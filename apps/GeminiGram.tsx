
import React from 'react';
import Icon from '../components/Icon';

const GeminiGram: React.FC = () => {
  const posts = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1558591710-4b4a1ad0f048?auto=format&fit=crop&q=80&w=500',
  ];

  return (
    <div className="h-full bg-slate-950 flex flex-col text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-10 border-b border-white/5">
        <h2 className="text-xl font-bold italic tracking-tighter">GeminiGram</h2>
        <div className="flex items-center space-x-6">
          <Icon name="plus-square" size={24} />
          <Icon name="heart" size={24} />
          <Icon name="message-circle" size={24} />
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 flex items-center space-x-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-500 to-red-500 p-1">
          <div className="w-full h-full bg-slate-950 rounded-full p-1">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
        <div className="flex-1 flex justify-around">
          <div className="text-center">
            <p className="font-bold">128</p>
            <p className="text-xs text-slate-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">2M</p>
            <p className="text-xs text-slate-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">0</p>
            <p className="text-xs text-slate-500">Following</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 px-0.5 mt-4">
        {posts.map((post, i) => (
          <div key={i} className="aspect-square group relative">
            <img src={post} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1"><Icon name="heart" size={16} /><span className="text-xs font-bold">2.4k</span></div>
              <div className="flex items-center space-x-1"><Icon name="message-circle" size={16} /><span className="text-xs font-bold">120</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeminiGram;
