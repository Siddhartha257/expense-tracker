import React, { useState } from 'react'
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5002/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (response.ok) {
            localStorage.setItem('token', json.token);
            navigate("/main");
        }
        else {
            alert(json.message || "Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: colors.background,
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: colors.cardBg,
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ 
                        color: colors.text,
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                    }}>
                        Welcome Back
                    </h2>
                    <p style={{
                        color: colors.textMuted,
                        fontSize: '1rem'
                    }}>
                        Sign in to continue to Xpense Master
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    <div>
                        <label htmlFor="email" style={{ 
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: colors.text,
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Email address
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={credentials.email} 
                            onChange={onChange} 
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text,
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" style={{ 
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: colors.text,
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={credentials.password} 
                            onChange={onChange} 
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text,
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: colors.button.primary,
                            color: 'white',
                            border: 'none',
                            padding: '0.875rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            marginTop: '1rem'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = colors.button.hover}
                        onMouseOut={(e) => e.target.style.backgroundColor = colors.button.primary}
                    >
                        Sign In
                    </button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: colors.textMuted,
                    fontSize: '0.875rem'
                }}>
                    Don't have an account?{' '}
                    <NavLink 
                        to="/register" 
                        style={{
                            color: colors.button.primary,
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Sign up
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
