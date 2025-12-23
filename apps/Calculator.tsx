
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleInput = (val: string) => {
    if (display === '0' && !isNaN(Number(val))) {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const calculate = () => {
    if (!display || display === 'Error') return;
    try {
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      if (/[\+\-\*\/]$/.test(expression)) return;
      const result = eval(expression);
      setEquation(display + ' =');
      setDisplay(String(Number.isFinite(result) ? result : 'Error'));
    } catch (err) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    { label: 'C', action: clear, type: 'special' },
    { label: '(', action: () => handleInput('('), type: 'special' },
    { label: ')', action: () => handleInput(')'), type: 'special' },
    { label: '÷', action: () => handleInput('÷'), type: 'operator' },
    { label: '7', action: () => handleInput('7'), type: 'number' },
    { label: '8', action: () => handleInput('8'), type: 'number' },
    { label: '9', action: () => handleInput('9'), type: 'number' },
    { label: '×', action: () => handleInput('×'), type: 'operator' },
    { label: '4', action: () => handleInput('4'), type: 'number' },
    { label: '5', action: () => handleInput('5'), type: 'number' },
    { label: '6', action: () => handleInput('6'), type: 'number' },
    { label: '-', action: () => handleInput('-'), type: 'operator' },
    { label: '1', action: () => handleInput('1'), type: 'number' },
    { label: '2', action: () => handleInput('2'), type: 'number' },
    { label: '3', action: () => handleInput('3'), type: 'number' },
    { label: '+', action: () => handleInput('+'), type: 'operator' },
    { label: '0', action: () => handleInput('0'), type: 'number' },
    { label: '.', action: () => handleInput('.'), type: 'number' },
    { label: '⌫', action: () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0'), type: 'number' },
    { label: '=', action: calculate, type: 'equals' },
  ];

  return (
    <div className="h-full bg-black flex flex-col p-4 pb-8">
      <div className="flex-1 flex flex-col justify-end items-end px-4 mb-6">
        <div className="text-slate-500 text-xl mb-1 h-8">{equation}</div>
        <div className="text-white text-7xl font-light tracking-tight truncate w-full text-right">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`
              h-[76px] rounded-3xl flex items-center justify-center text-2xl font-semibold transition-all active:scale-90
              ${btn.type === 'number' ? 'bg-slate-900 text-white shadow-lg' : ''}
              ${btn.type === 'operator' ? 'bg-blue-600 text-white shadow-blue-500/20' : ''}
              ${btn.type === 'special' ? 'bg-slate-800 text-slate-300' : ''}
              ${btn.type === 'equals' ? 'bg-blue-400 text-black shadow-blue-400/30' : ''}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
