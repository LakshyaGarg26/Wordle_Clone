import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabledKeys: Set<string>;
}

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, disabledKeys }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={`bg-gray-300 text-black font-bold py-2 px-4 rounded ${disabledKeys.has(key) ? 'bg-gray-600' : ''}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex space-x-1">
        <button
          className="bg-gray-300 text-black font-bold py-2 px-4 rounded"
          onClick={() => onKeyPress('Enter')}
        >
          Enter
        </button>
        <button
          className="bg-gray-300 text-black font-bold py-2 px-4 rounded"
          onClick={() => onKeyPress('Backspace')}
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
