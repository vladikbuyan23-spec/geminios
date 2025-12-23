
import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([
    'GeminiOS Terminal [Version 1.0.42]',
    'Connected to Core Neural Network...',
    'Type "help" for a list of commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newLines = [...lines, `> ${input}`];
      
      switch(cmd) {
        case 'help':
          newLines.push('Available commands: help, clear, status, about, sysinfo, whoami');
          break;
        case 'clear':
          setLines([]);
          setInput('');
          return;
        case 'status':
          newLines.push('SYSTEM STATUS: OPERATIONAL');
          newLines.push('CPU: AI-Enhanced 128-core Quantum Processor');
          newLines.push('RAM: 2TB Neural-Link Buffer');
          break;
        case 'about':
          newLines.push('GeminiOS: A concept OS powered by LLMs.');
          break;
        case 'whoami':
          newLines.push('You are the Architect of this session.');
          break;
        case 'sysinfo':
          newLines.push(`Agent: ${navigator.userAgent}`);
          newLines.push(`Platform: GeminiOS Web-Virtual`);
          break;
        default:
          if (cmd !== '') newLines.push(`Command not found: ${cmd}`);
      }
      
      setLines(newLines);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono p-4 overflow-y-auto selection:bg-green-900 selection:text-white">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">{line}</div>
      ))}
      <div className="flex">
        <span className="mr-2">$&gt;</span>
        <input
          type="text"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none text-green-400 flex-1"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
