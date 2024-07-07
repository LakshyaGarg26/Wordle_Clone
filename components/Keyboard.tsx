// components/Keyboard.tsx
import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  correctLetters: Set<string>;
  presentLetters: Set<string>;
  absentLetters: Set<string>;
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const getKeyClass = (key: string, correctLetters: Set<string>, presentLetters: Set<string>, absentLetters: Set<string>) => {
  if (correctLetters.has(key)) {
    return 'bg-green-500 text-white';
  } else if (presentLetters.has(key)) {
    return 'bg-yellow-500 text-white';
  } else if (absentLetters.has(key)) {
    return 'bg-gray-600 text-white';
  } else {
    return 'bg-gray-300 text-black';
  }
};

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, correctLetters, presentLetters, absentLetters }) => {
  return (
    <div className="flex flex-col items-center mt-4 w-full">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-1 mb-2 w-full">
          {row.map((key) => (
            <button
              key={key}
              className={`font-bold py-2 px-2 md:px-4 rounded ${getKeyClass(key, correctLetters, presentLetters, absentLetters)}`}
              style={{ flex: '1 0 auto', maxWidth: '3rem' }}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center space-x-1 w-full">
        <button
          className="bg-gray-300 text-black font-bold py-2 px-2 md:px-4 rounded flex-1 max-w-xs"
          onClick={() => onKeyPress('Enter')}
        >
          Enter
        </button>
        <button
          className="bg-gray-300 text-black font-bold py-2 px-2 md:px-4 rounded flex-1 max-w-xs"
          onClick={() => onKeyPress('Backspace')}
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
