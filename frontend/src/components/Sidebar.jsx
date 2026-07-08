import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = () => {
  // Common styles for the navigation links
  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    margin: '4px 0',
    borderRadius: '8px',
    color: '#4a5568',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out'
  };

  // Dynamic style handler to highlight the active tab
  const getLinkStyle = ({ isActive }) => ({
    ...linkStyle,
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    color: isActive ? '#ffffff' : '#4a5568',
    boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'
  });

  return (
    <aside 
      className="sidebar" 
      style={{
        width: '260px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0
      }}
    >
      {/* Brand Branding Header + Home Page Button */}
      <div style={{ 
        padding: '24px', 
        borderBottom: '1px solid #edf2f7', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#2563eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            R
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontWeight: '700', color: '#1a202c', fontSize: '16px', lineHeight: '1.2' }}>
              Rovyn Gen
            </span>
            <span style={{ textTransform: 'uppercase', fontSize: '10px', color: '#a0aec0', letterSpacing: '1px', fontWeight: '600' }}>
              Hardware & POS
            </span>
          </div>
        </div>

        {/* --- NEW BUTTON: GO TO USER SIDE --- */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            backgroundColor: '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            color: '#4a5568',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            textAlign: 'center'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#edf2f7'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
        >
          <span>🏠</span> View User Website
        </Link>
      </div>
      
      {/* Navigation Area */}
      <nav style={{ flex: 1, padding: '16px' }}>
        {/* Dashboard Link */}
        <NavLink to="/admin" end style={getLinkStyle}>
          <span style={{ marginRight: '12px' }}>📊</span>
          <span>Dashboard</span>
        </NavLink>

        {/* Products Link */}
        <NavLink to="/admin/products" style={getLinkStyle}>
          <span style={{ marginRight: '12px' }}>📦</span>
          <span>Products</span>
        </NavLink>

        {/* New Sale Link */}
        <NavLink to="/admin/new-sale" style={getLinkStyle}>
          <span style={{ marginRight: '12px' }}>💰</span>
          <span>New Sale</span>
        </NavLink>
      </nav>

      {/* Quick Admin Profile Footer */}
      <div style={{ padding: '16px', borderTop: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#e2e8f0',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          color: '#4a5568',
          fontSize: '14px'
        }}>
          AD
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>Admin Staff</span>
          <span style={{ fontSize: '11px', color: '#718096' }}>Management</span>
        </div>
      </div>
      
    </aside>
  );
};

export default Sidebar;