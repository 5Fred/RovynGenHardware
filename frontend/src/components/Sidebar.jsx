import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  // Simple style helper for active/inactive links defined clearly inside the component scope
  const linkStyle = ({ isActive }) => ({
    padding: '12px 15px', 
    backgroundColor: isActive ? '#333' : 'transparent', 
    color: isActive ? '#fff' : '#b5b5c3',
    borderRadius: '6px', 
    marginBottom: '12px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    fontWeight: 'bold'
  });

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      backgroundColor: '#1e1e24',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '25px 20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ marginBottom: '40px', fontSize: '22px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
        Rovyn Gen Hardware
      </h2>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <NavLink to="/" style={linkStyle}>
          <span>📊</span> Dashboard
        </NavLink>
        
        <NavLink to="/products" style={linkStyle}>
          <span>📦</span> Products Inventory
        </NavLink>

        <NavLink to="/new-sale" style={linkStyle}>
          <span>💰</span> Record New Sale
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;