
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import Icon from '../components/Icon';

const ImageGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setImage(null);
    try {
      const result = await generateImage(prompt);
      setImage(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 p-6 overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Vision</h2>
        <p className="text-slate-400 text-sm">AI Image Generation Studio</p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Imagine something amazing..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 h-40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm resize-none shadow-inner"
          />
          <button 
            onClick={() => setPrompt('')}
            className="absolute top-4 right-4 text-white/20 hover:text-white"
          >
            <Icon name="x-circle" size={20} />
          </button>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-white shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Icon name="sparkles" size={20} />
              <span>Generate Art</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-10 flex-1 flex items-center justify-center bg-white/5 rounded-3xl border border-dashed border-white/10 min-h-[300px]">
        {image ? (
          <div className="relative group p-2 animate-fade-in">
            <img src={image} alt="Generated" className="rounded-2xl shadow-2xl max-w-full" />
            <a 
              href={image} 
              download="vision-gen.png"
              className="absolute bottom-6 right-6 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex items-center space-x-2"
            >
              <Icon name="download" size={20} />
            </a>
          </div>
        ) : !loading && (
          <div className="text-slate-600 flex flex-col items-center">
            <Icon name="palette" size={60} className="mb-4 opacity-10" />
            <p className="text-xs uppercase tracking-widest font-bold opacity-30">Your masterpiece here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGen;
