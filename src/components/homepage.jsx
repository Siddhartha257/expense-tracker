import React from 'react'
import './homepage.css'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Homepage(props) {
  const navigate = useNavigate();
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

  if(props.mode==='dark'){
    document.body.style.backgroundColor='#134074'
  }
  else{
      document.body.style.backgroundColor='white'
  }

  const features = [
    {
      icon: '📊',
      title: 'Track Expenses',
      description: 'Easily log and categorize your daily expenses'
    },
    {
      icon: '💰',
      title: 'Set Budgets',
      description: 'Create and manage budgets for different categories'
    },
    {
      icon: '📈',
      title: 'View Analytics',
      description: 'Get insights with beautiful charts and reports'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.background,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Hero Section */}
      <section style={{
        width: '100%',
        padding: '6rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: colors.cardBg,
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            color: colors.text,
            marginBottom: '1.5rem',
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Welcome to Xpense Master
          </h1>
          <p style={{ 
            color: colors.textMuted,
            marginBottom: '2.5rem',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Track your expenses and manage your finances with ease
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => navigate('/register')}
              style={{
                backgroundColor: colors.button.primary,
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                minWidth: '150px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.button.hover}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.button.primary}
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate('/log')}
              style={{
                backgroundColor: 'transparent',
                color: colors.text,
                border: `2px solid ${colors.border}`,
                padding: '0.75rem 2rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                minWidth: '150px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.cardHeaderBg;
                e.target.style.borderColor = colors.text;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = colors.border;
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        width: '100%',
        padding: '4rem 2rem',
        backgroundColor: colors.cardBg,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: colors.text,
            fontSize: '2rem',
            marginBottom: '3rem',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Key Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            width: '100%'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                backgroundColor: colors.background,
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '250px'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1.5rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  color: colors.text,
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: colors.textMuted,
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  maxWidth: '250px'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        width: '100%',
        padding: '4rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: colors.cardBg,
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: colors.text,
            fontSize: '2.25rem',
            marginBottom: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            Ready to Start Managing Your Finances?
          </h2>
          <p style={{
            color: colors.textMuted,
            fontSize: '1.1rem',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Join thousands of users who are already taking control of their expenses
          </p>
          <button 
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: colors.button.primary,
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              minWidth: '200px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = colors.button.hover}
            onMouseOut={(e) => e.target.style.backgroundColor = colors.button.primary}
          >
            Create Your Account
          </button>
        </div>
      </section>
    </div>
  )
}