import React from 'react';

interface GameControlsProps {
  handleSubmit: () => void;
  gameOver: boolean;
  handleRestart: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ handleSubmit, gameOver, handleRestart }) => (
  <div className="flex gap-4">
    <button
      onClick={handleSubmit}
      className="bg-green-500 text-white px-4 py-2 rounded"
      disabled={gameOver}
    >
      Submit
    </button>
    <button
      onClick={handleRestart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {gameOver ? 'Play Again' : 'Restart'}
    </button>
  </div>
);

export default GameControls;
