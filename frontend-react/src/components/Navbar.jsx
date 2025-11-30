import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleTheme, isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Computer Networks Lab</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
              Virtual Lab
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cn-lab" className={`nav-link ${isActive('/cn-lab')}`} onClick={() => setIsMenuOpen(false)}>
              CN Lab
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/notes" className={`nav-link ${isActive('/notes')}`} onClick={() => setIsMenuOpen(false)}>
              Notes
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item user-info">
                <span className="user-name">👤 {user?.name}</span>
              </li>
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={() => { onLogout(); setIsMenuOpen(false); }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className={`nav-link ${isActive('/login')}`} onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
        </button>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
