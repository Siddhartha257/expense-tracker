import React, { useState } from 'react'
import './calculator.css'

export default function Calculator(props) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const isDark = props.mode === 'dark';
  
  // Theme colors
  const colors = {
    background: isDark ? '#121212' : '#f7f9fc',
    cardBg: isDark ? '#1e1e1e' : '#ffffff',
    cardHeaderBg: isDark ? '#2a2a2a' : '#f8fafc',
    border: isDark ? '#333333' : '#e2e8f0',
    text: isDark ? '#e0e0e0' : '#334155',
    textMuted: isDark ? '#a0a0a0' : '#64748b',
    button: {
      primary: '#3b82f6',
      hover: '#2563eb',
      danger: '#f43f5e',
      dangerHover: '#e11d48',
    }
  };

  const handleNumber = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setEquation(display + operator);
    setDisplay('0');
  };

  const handleEqual = () => {
    const result = eval(equation + display);
    setDisplay(result.toString());
    setEquation('');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: colors.background 
    }}>
      <div className="calculator" style={{
        backgroundColor: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        width: '320px'
      }}>
        <div className="display" style={{
          backgroundColor: colors.cardHeaderBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          textAlign: 'right',
          color: colors.text,
          fontSize: '2rem',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          {display}
        </div>
        <div className="buttons" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem'
        }}>
          <button onClick={handleClear} style={{
            backgroundColor: colors.button.danger,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = colors.button.dangerHover}
          onMouseOut={(e) => e.target.style.backgroundColor = colors.button.danger}>
            C
          </button>
          <button onClick={() => handleOperator('/')} style={{
            backgroundColor: colors.cardHeaderBg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = colors.button.primary;
            e.target.style.color = '#fff';
            e.target.style.borderColor = colors.button.primary;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = colors.cardHeaderBg;
            e.target.style.color = colors.text;
            e.target.style.borderColor = colors.border;
          }}>
            ÷
          </button>
          <button onClick={() => handleOperator('*')} style={{
            backgroundColor: colors.cardHeaderBg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = colors.button.primary;
            e.target.style.color = '#fff';
            e.target.style.borderColor = colors.button.primary;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = colors.cardHeaderBg;
            e.target.style.color = colors.text;
            e.target.style.borderColor = colors.border;
          }}>
            ×
          </button>
          <button onClick={() => handleOperator('-')} style={{
            backgroundColor: colors.cardHeaderBg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = colors.button.primary;
            e.target.style.color = '#fff';
            e.target.style.borderColor = colors.button.primary;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = colors.cardHeaderBg;
            e.target.style.color = colors.text;
            e.target.style.borderColor = colors.border;
          }}>
            -
          </button>
          {[7, 8, 9, '+'].map((num) => (
            <button
              key={num}
              onClick={() => typeof num === 'number' ? handleNumber(num) : handleOperator(num)}
              style={{
                backgroundColor: colors.cardHeaderBg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.button.primary;
                e.target.style.color = '#fff';
                e.target.style.borderColor = colors.button.primary;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.cardHeaderBg;
                e.target.style.color = colors.text;
                e.target.style.borderColor = colors.border;
              }}
            >
              {num}
            </button>
          ))}
          {[4, 5, 6, '.'].map((num) => (
            <button
              key={num}
              onClick={() => typeof num === 'number' ? handleNumber(num) : handleNumber('.')}
              style={{
                backgroundColor: colors.cardHeaderBg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.button.primary;
                e.target.style.color = '#fff';
                e.target.style.borderColor = colors.button.primary;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.cardHeaderBg;
                e.target.style.color = colors.text;
                e.target.style.borderColor = colors.border;
              }}
            >
              {num}
            </button>
          ))}
          {[1, 2, 3, '='].map((num) => (
            <button
              key={num}
              onClick={() => typeof num === 'number' ? handleNumber(num) : handleEqual()}
              style={{
                backgroundColor: num === '=' ? colors.button.primary : colors.cardHeaderBg,
                color: num === '=' ? '#fff' : colors.text,
                border: `1px solid ${num === '=' ? colors.button.primary : colors.border}`,
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                gridRow: num === '=' ? 'span 2' : 'auto'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.button.hover;
                e.target.style.color = '#fff';
                e.target.style.borderColor = colors.button.hover;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = num === '=' ? colors.button.primary : colors.cardHeaderBg;
                e.target.style.color = num === '=' ? '#fff' : colors.text;
                e.target.style.borderColor = num === '=' ? colors.button.primary : colors.border;
              }}
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleNumber(0)} style={{
            backgroundColor: colors.cardHeaderBg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            gridColumn: 'span 2'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = colors.button.primary;
            e.target.style.color = '#fff';
            e.target.style.borderColor = colors.button.primary;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = colors.cardHeaderBg;
            e.target.style.color = colors.text;
            e.target.style.borderColor = colors.border;
          }}>
            0
          </button>
        </div>
      </div>
    </div>
  );
}
