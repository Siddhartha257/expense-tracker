import React, { useState } from 'react'
import './register.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
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
        const response = await fetch("http://127.0.0.1:5002/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
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
        <div className="register-container" style={{ backgroundColor: colors.background }}>
            <div className="register-card" style={{ backgroundColor: colors.cardBg }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ 
                        color: colors.text,
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                    }}>
                        Create Account
                    </h2>
                    <p style={{
                        color: colors.textMuted,
                        fontSize: '1rem'
                    }}>
                        Join Xpense Master today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div>
                        <label htmlFor="name" style={{ 
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: colors.text,
                            fontSize: '0.875rem',
                            fontWeight: '500'
                        }}>
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={credentials.name} 
                            onChange={onChange} 
                            required
                            className="register-input"
                            style={{
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text
                            }}
                            placeholder="Enter your full name"
                        />
                    </div>

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
                            className="register-input"
                            style={{
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text
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
                            className="register-input"
                            style={{
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.cardBg,
                                color: colors.text
                            }}
                            placeholder="Create a password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="register-button"
                        style={{
                            backgroundColor: colors.button.primary,
                            color: 'white',
                            border: 'none'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = colors.button.hover}
                        onMouseOut={(e) => e.target.style.backgroundColor = colors.button.primary}
                    >
                        Create Account
                    </button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: colors.textMuted,
                    fontSize: '0.875rem'
                }}>
                    Already have an account?{' '}
                    <NavLink 
                        to="/login" 
                        className="register-link"
                        style={{
                            color: colors.button.primary
                        }}
                    >
                        Sign in
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
