import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

export default function Nav(props) {
  const isDark = props.mode === 'dark';
  
  // Theme colors
  const colors = {
    background: isDark ? '#121212' : '#f7f9fc',
    cardBg: isDark ? '#1e1e1e' : '#ffffff',
    cardHeaderBg: isDark ? '#2a2a2a' : '#f8fafc',
    border: isDark ? '#333333' : '#e2e8f0',
    text: '#ffffff', // Always white text for nav
    textMuted: isDark ? '#a0a0a0' : '#64748b',
    button: {
      primary: isDark ? '#1e1e1e' : '#3b82f6',
      hover: isDark ? '#2a2a2a' : '#2563eb',
      danger: '#f43f5e',
      dangerHover: '#e11d48',
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{
      backgroundColor: colors.button.primary,
      borderBottom: `1px solid ${colors.border}`
    }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{ color: colors.text }}>
          Xpense Master
        </NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/main" 
                style={{ color: colors.text }}
              >
                Home
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <NavLink 
              to="/calculator" 
              className="nav-icon"
              style={{ color: colors.text }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-calculator" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm4-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm4-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
              </svg>
            </NavLink>
            <div className="form-check form-switch ms-3">
              <NavLink 
                className="nav-icon"
                onClick={props.togglemode} 
                style={{ color: colors.text }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-circle-half" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
