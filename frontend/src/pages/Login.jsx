import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Color theme matching the dashboard and landing page
  const colors = {
    primary: '#1A191D',
    lightBg: '#F9F9F9',
    textDark: '#2D3748',
    border: '#E2E8F0'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation check
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // TODO: Connect to your backend API authentication here
    console.log('Logging in with:', { email, password });
    
    // For now, successfully redirect to the admin panel dashboard
    navigate('/admin');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#fff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${colors.border}`,
        backgroundColor: '#fff'
      }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: colors.primary, margin: '0 0 10px 0' }}>
            Admin Portal
          </h2>
          <p style={{ color: '#718096', fontSize: '0.9rem', margin: 0 }}>
            Sign in to manage inventory, view transactions, and record sales.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div style={{
            backgroundColor: '#FFF5F5',
            color: '#C53030',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            borderLeft: '4px solid #C53030'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.textDark }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@rovyngen.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.textDark }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: colors.primary,
              color: '#fff',
              padding: '12px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;