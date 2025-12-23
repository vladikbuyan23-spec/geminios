
import React from 'react';
import Icon from '../components/Icon';

const NeuralTok: React.FC = () => {
  const feeds = [
    { user: '@architect_ai', desc: 'Synthesizing new neural pathways in GeminiOS #future', likes: '1.2M', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000' },
    { user: '@pixel_master', desc: 'Look at this 2.5 Flash image generation speed! 🚀', likes: '842K', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' },
    { user: '@quantum_coder', desc: 'Coding the terminal app was a vibe #code', likes: '200K', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000' },
  ];

  return (
    <div className="h-full bg-black flex flex-col snap-y snap-mandatory overflow-y-auto scrollbar-hide">
      {feeds.map((item, i) => (
        <div key={i} className="min-h-full w-full relative snap-start">
          <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="feed" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Overlay Content */}
          <div className="absolute bottom-10 left-4 right-16 text-white animate-fade-in">
            <p className="font-bold text-lg mb-2">{item.user}</p>
            <p className="text-sm opacity-80 line-clamp-2">{item.desc}</p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-2">
                <Icon name="music" size={12} />
                <span className="text-xs">Original Sound - GeminiOS</span>
              </div>
            </div>
          </div>

          {/* Side Actions */}
          <div className="absolute bottom-10 right-4 flex flex-col items-center space-y-6 text-white">
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-1">
                <Icon name="heart" className="text-red-500 fill-red-500" />
              </button>
              <span className="text-[10px] font-bold">{item.likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-1">
                <Icon name="message-circle" />
              </button>
              <span className="text-[10px] font-bold">2.4K</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <Icon name="share-2" />
              </button>
              <span className="text-[10px] font-bold">Share</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NeuralTok;
