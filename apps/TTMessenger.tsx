
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../components/Icon';
import { chatWithGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  content: string;
  time: string;
}

interface Chat {
  id: string;
  name: string;
  last: string;
  time: string;
  unread: number;
  color: string;
  type: 'ai' | 'group' | 'bot';
  description: string;
  history: Message[];
}

const TTMessenger: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    { 
      id: '1', 
      name: 'Gemini AI Hub', 
      last: 'Neural core update v1.5.2 is stable.', 
      time: '12:45', 
      unread: 1, 
      color: 'bg-blue-500', 
      type: 'ai',
      description: 'Official GeminiOS news and support.',
      history: [
        { role: 'model', content: 'Welcome to the AI Hub. System version 1.5.2 is now stable. All neural nodes are operational. How can I assist you today?', time: '10:00' }
      ]
    },
    { 
      id: '2', 
      name: 'Architect Neural Link', 
      last: 'Kernel synchronized successfully.', 
      time: '11:20', 
      unread: 0, 
      color: 'bg-emerald-500', 
      type: 'bot',
      description: 'Your personal AI development assistant.',
      history: [
        { role: 'model', content: 'Greetings Architect. I have analyzed the system kernel. Shall we begin neural synchronization for the next deployment?', time: '09:30' }
      ]
    },
    { 
      id: '3', 
      name: 'Neural Design Lab', 
      last: 'New UI mockups are live!', 
      time: 'Yesterday', 
      unread: 0, 
      color: 'bg-purple-600', 
      type: 'group',
      description: 'Global community of GeminiOS designers.',
      history: [
        { role: 'model', content: 'The new glassmorphism icons look stunning on the 2.5 Flash model. We should push the update tonight.', time: 'Yesterday' }
      ]
    },
  ]);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.history, loading]);

  const handleSend = async () => {
    if (!inputText.trim() || !activeChat || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...activeChat.history, userMessage];
    
    setChats(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, history: updatedHistory, last: inputText, time: 'Now', unread: 0 } : c
    ));
    
    setInputText('');
    setLoading(true);

    try {
      const historyForAi = updatedHistory.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithGemini(inputText, historyForAi);
      
      const aiMessage: Message = {
        role: 'model',
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prev => prev.map(c => 
        c.id === activeChatId ? { 
          ...c, 
          history: [...c.history, aiMessage], 
          last: response.slice(0, 50) + (response.length > 50 ? '...' : ''),
          time: 'Now'
        } : c
      ));
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        role: 'model',
        content: "Neural core link error. Please check your system connection or API key.",
        time: 'System'
      };
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, history: [...c.history, errorMessage] } : c));
    } finally {
      setLoading(false);
    }
  };

  if (activeChat) {
    return (
      <div className="h-full bg-slate-900 flex flex-col animate-fade-in overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-white/5 flex items-center space-x-4 shadow-xl z-10">
          <button onClick={() => setActiveChatId(null)} className="text-white hover:text-blue-400 transition-colors p-1 active:scale-90">
            <Icon name="arrow-left" size={24} />
          </button>
          <div className="flex-1">
             <h3 className="text-white font-bold text-sm truncate">{activeChat.name}</h3>
             <p className="text-blue-400 text-[10px] uppercase font-black tracking-tighter">
               {loading ? 'AI IS THINKING...' : 'NEURAL ONLINE'}
             </p>
          </div>
          <Icon name="more-vertical" size={20} className="text-slate-500" />
        </div>

        <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-950/50 scroll-smooth scrollbar-hide">
          {activeChat.history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
               <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm relative shadow-sm ${
                 msg.role === 'user' 
                   ? 'bg-blue-600 text-white rounded-tr-none' 
                   : 'bg-white/10 text-slate-100 border border-white/5 rounded-tl-none'
               }`}>
                 <div className="whitespace-pre-wrap">{msg.content}</div>
                 <span className="block text-[8px] opacity-40 text-right mt-1 font-mono uppercase">{msg.time}</span>
               </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-white/5 p-3 px-6 rounded-2xl rounded-tl-none flex space-x-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
               </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900 border-t border-white/5 flex items-center space-x-3 pb-safe">
          <button className="text-slate-500 hover:text-white transition-colors active:scale-90">
            <Icon name="paperclip" size={20} />
          </button>
          <div className="flex-1 bg-white/5 rounded-2xl flex items-center px-4 py-1 border border-white/10">
            <input 
              type="text" 
              placeholder="Message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="bg-transparent flex-1 text-white text-sm outline-none py-2"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={loading || !inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${loading || !inputText.trim() ? 'bg-white/5 text-white/20' : 'bg-blue-600 text-white active:scale-90 shadow-lg shadow-blue-500/20'}`}
          >
            <Icon name="send" size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-950 flex flex-col text-white animate-fade-in overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-10">
        <Icon name="menu" className="text-white/60" />
        <h2 className="font-bold tracking-tight">TT Messenger</h2>
        <Icon name="search" className="text-white/60" />
      </div>

      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <div className="p-4 flex space-x-4 overflow-x-auto scrollbar-hide mb-2">
           {chats.map(chat => (
             <div key={chat.id} className="flex flex-col items-center space-y-1 shrink-0">
                <div 
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-14 h-14 rounded-full ${chat.color} flex items-center justify-center border-2 border-white/10 p-1 active:scale-90 transition-transform cursor-pointer shadow-lg`}
                >
                   <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black tracking-tighter">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                   </div>
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase truncate w-14 text-center">{chat.name.split(' ')[0]}</span>
             </div>
           ))}
        </div>

        <div className="px-2">
          {chats.map(chat => (
            <button 
              key={chat.id} 
              onClick={() => {
                setActiveChatId(chat.id);
                setChats(prev => prev.map(c => c.id === chat.id ? {...c, unread: 0} : c));
              }}
              className="w-full flex items-center space-x-4 p-4 rounded-3xl active:bg-white/5 transition-colors group"
            >
              <div className={`w-14 h-14 rounded-2xl ${chat.color} flex items-center justify-center text-xl font-bold shadow-lg group-active:scale-95 transition-transform shrink-0`}>
                <Icon name={chat.type === 'ai' ? 'bot' : chat.type === 'bot' ? 'cpu' : 'users'} size={24} className="text-white" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-bold text-[14px] truncate">{chat.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate font-medium">
                  {chat.last}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-blue-600 rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(37,99,235,0.5)] shrink-0">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all hover:bg-blue-400 ring-4 ring-blue-500/20 z-20">
        <Icon name="edit-3" size={24} />
      </button>
    </div>
  );
};

export default TTMessenger;
