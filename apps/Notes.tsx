
import React, { useState } from 'react';
import Icon from '../components/Icon';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'Project Gemini', content: 'Explore multi-modal interaction models.', date: 'Oct 12' },
    { id: 2, title: 'Shopping List', content: 'Neural link adapter, Quantum cooling gel.', date: 'Oct 11' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addNote = () => {
    if (!newTitle) return;
    const note: Note = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
    };
    setNotes([note, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  return (
    <div className="h-full bg-slate-950 flex flex-col relative">
      <div className="p-6">
        <h2 className="text-white text-2xl font-bold mb-6">Neural Notes</h2>
        <div className="grid grid-cols-2 gap-4">
          {notes.map(note => (
            <div key={note.id} className="bg-amber-100 rounded-2xl p-4 h-40 flex flex-col justify-between text-slate-900 shadow-lg rotate-1 hover:rotate-0 transition-transform">
              <div>
                <h3 className="font-bold text-sm mb-1">{note.title}</h3>
                <p className="text-[11px] opacity-70 line-clamp-4">{note.content}</p>
              </div>
              <span className="text-[9px] font-bold opacity-50 uppercase">{note.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsAdding(true)}
        className="absolute bottom-10 right-6 w-14 h-14 bg-amber-500 rounded-2xl shadow-xl flex items-center justify-center text-white active:scale-90 transition-transform"
      >
        <Icon name="plus" size={28} />
      </button>

      {/* Add Modal */}
      {isAdding && (
        <div className="absolute inset-0 z-[100] bg-slate-950 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setIsAdding(false)} className="text-slate-400">
              <Icon name="arrow-left" size={24} />
            </button>
            <button onClick={addNote} className="text-blue-400 font-bold">Save</button>
          </div>
          <input 
            autoFocus
            type="text" 
            placeholder="Title" 
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="bg-transparent text-white text-2xl font-bold outline-none mb-4"
          />
          <textarea 
            placeholder="Start typing..." 
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            className="bg-transparent text-slate-300 flex-1 outline-none resize-none leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};

export default Notes;
