import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

interface ToggleButtonProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ darkMode, toggleDarkMode }) => (
  <button onClick={toggleDarkMode} className="absolute top-4 right-4 p-2" style={{ transform: 'scale(0.9)' }}>
    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" />
  </button>
);

export default ToggleButton;
