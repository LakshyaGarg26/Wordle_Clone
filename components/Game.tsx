import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import ToggleButton from './ToggleButton';
import GameGrid from './GameGrid';
import GameControls from './GameControls';
import Keyboard from './Keyboard';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const Game: React.FC = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_ATTEMPTS).fill(''));
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(WORD_LENGTH).fill(''));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [correctLetters, setCorrectLetters] = useState<Set<string>>(new Set());
  const [presentLetters, setPresentLetters] = useState<Set<string>>(new Set());
  const [absentLetters, setAbsentLetters] = useState<Set<string>>(new Set());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    const fetchWords = async () => {
      const response = await fetch('/api/words');
      const words = await response.json();
      setTargetWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
    };

    fetchWords();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]$/.test(value)) {
      const newGuess = [...currentGuess];
      newGuess[index] = value;
      setCurrentGuess(newGuess);

      if (index < WORD_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newGuess = [...currentGuess];
      newGuess[index] = '';
      setCurrentGuess(newGuess);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newGuess = [...currentGuess];
      if (newGuess[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        newGuess[index] = '';
        setCurrentGuess(newGuess);
      }
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleKeyPress = (key: string) => {
    const activeIndex = currentGuess.findIndex(letter => letter === '');
    if (key === 'Enter') {
      handleSubmit();
    } else if (key === 'Backspace') {
      if (activeIndex === -1) {
        const newGuess = [...currentGuess];
        newGuess[WORD_LENGTH - 1] = '';
        setCurrentGuess(newGuess);
        inputRefs.current[WORD_LENGTH - 1]?.focus();
      } else if (activeIndex > 0) {
        const newGuess = [...currentGuess];
        newGuess[activeIndex - 1] = '';
        setCurrentGuess(newGuess);
        inputRefs.current[activeIndex - 1]?.focus();
      }
    } else if (/^[A-Z]$/.test(key) && activeIndex !== -1) {
      const newGuess = [...currentGuess];
      newGuess[activeIndex] = key;
      setCurrentGuess(newGuess);
      if (activeIndex < WORD_LENGTH - 1) {
        inputRefs.current[activeIndex + 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (currentGuess.every(letter => /^[A-Z]$/.test(letter)) && !gameOver) {
      const guessString = currentGuess.join('');
      const newGuesses = [...guesses];
      newGuesses[currentAttempt] = guessString;
      setGuesses(newGuesses);

      // Update letter sets
      const newCorrectLetters = new Set(correctLetters);
      const newPresentLetters = new Set(presentLetters);
      const newAbsentLetters = new Set(absentLetters);

      guessString.split('').forEach((letter, idx) => {
        if (targetWord[idx] === letter) {
          newCorrectLetters.add(letter);
        } else if (targetWord.includes(letter)) {
          newPresentLetters.add(letter);
        } else {
          newAbsentLetters.add(letter);
        }
      });

      setCorrectLetters(newCorrectLetters);
      setPresentLetters(newPresentLetters);
      setAbsentLetters(newAbsentLetters);

      if (guessString === targetWord) {
        setGameOver(true);
      } else if (currentAttempt + 1 === MAX_ATTEMPTS) {
        setGameOver(true);
      } else {
        setCurrentAttempt(currentAttempt + 1);
        setCurrentGuess(Array(WORD_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const getLetterClass = (letter: string, pos: number, attempt: number) => {
    if (!guesses[attempt]) return darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300';
    const targetLetter = targetWord[pos];
    if (letter === targetLetter) return 'bg-green-500 text-white';
    if (targetWord.includes(letter)) return 'bg-yellow-500 text-white';
    return darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300';
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Header title="Welcome to Wordle" />
      <ToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex flex-col items-center w-full">
        {guesses.map((guess, attempt) => (
          <div key={attempt} className="grid grid-cols-5 gap-2 mb-2 md:gap-4 md:mb-4">
            {Array.from({ length: WORD_LENGTH }).map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 md:w-14 md:h-14 border-2 flex items-center justify-center text-xl md:text-2xl font-bold ${getLetterClass(guess[index], index, attempt)}`}
              >
                {guess[index]}
              </div>
            ))}
          </div>
        ))}
        {!gameOver && (
          <div className="grid grid-cols-5 gap-2 mb-2 md:gap-4 md:mb-4">
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
                className={`w-10 h-10 md:w-14 md:h-14 border-2 text-center text-xl md:text-2xl font-bold ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                disabled={gameOver}
                onFocus={(e) => e.preventDefault()}
              />
            ))}
          </div>
        )}
        {gameOver && (
          <div className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
            {guesses[currentAttempt] === targetWord ? 'Congratulations!' : `Game Over! The word was ${targetWord}`}
          </div>
        )}
        <GameControls handleSubmit={handleSubmit} gameOver={gameOver} handleRestart={handleRestart} />
        {!gameOver && (
          <Keyboard 
            onKeyPress={handleKeyPress} 
            correctLetters={correctLetters} 
            presentLetters={presentLetters} 
            absentLetters={absentLetters} 
          />
        )}
      </main>
    </div>
  );
};

export default Game;
