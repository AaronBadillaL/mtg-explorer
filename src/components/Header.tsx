import React, { useState } from 'react';
import { useTheme } from '../context/useTheme';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>MTG Explorer</h1>
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="/cards" onClick={() => setIsMenuOpen(false)}>Cards</a></li>
            <li><a href="/decks" onClick={() => setIsMenuOpen(false)}>Decks</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 