import React from 'react';

interface GameGridProps {
  guesses: string[];
  currentGuess: string[];
  currentAttempt: number;
  darkMode: boolean;
  gameOver: boolean;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  targetWord: string;
}

const GameGrid: React.FC<GameGridProps> = ({
  guesses,
  currentGuess,
  currentAttempt,
  darkMode,
  gameOver,
  inputRefs,
  handleInputChange,
  handleKeyDown,
  targetWord,
}) => {
  const WORD_LENGTH = 5;

  const getLetterClass = (letter: string, pos: number, attempt: number) => {
    if (attempt === currentAttempt && gameOver && guesses[currentAttempt] === targetWord) return 'bg-green-500 text-white';
    if (letter === targetWord[pos]) return 'bg-green-500 text-white';
    if (targetWord.includes(letter)) return 'bg-yellow-500 text-white';
    return darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300';
  };

  return (
    <div>
      {guesses.map((guess, attempt) => (
        <div key={attempt} className="grid grid-cols-5 gap-4 mb-4">
          {Array.from({ length: WORD_LENGTH }).map((_, index) => (
            <div
              key={index}
              className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold ${getLetterClass(guess[index], index, attempt)}`}
            >
              {guess[index]}
            </div>
          ))}
        </div>
      ))}
      {!gameOver && (
        <div className="grid grid-cols-5 gap-4 mb-4">
          {currentGuess.map((letter, index) => (
            <input
              key={index}
              ref={el => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              value={letter}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className={`w-14 h-14 border-2 text-center text-2xl font-bold ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
              disabled={gameOver}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameGrid;
