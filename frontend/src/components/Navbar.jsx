import React, { useState } from 'react';

export default function Navbar({ products = [], setFilteredProducts, cart = [], setCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Handle Live Search Filtering
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Assuming products are passed as props, filter them live
    if (setFilteredProducts) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // 2. Cart Management Functions
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 3. Staff Portal Redirect/Verification
  const handleStaffPortalClick = () => {
    // Replace with your preferred route navigation (e.g., useNavigate from react-router-dom)
    window.location.href = '/admin/login'; 
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 40px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: 'system-ui, sans-serif'
    }}>
      
      {/* BRAND LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
        <div style={{
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '24px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          marginRight: '12px'
        }}>R</div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '18px', color: '#0f172a', lineHeight: '1.2' }}>Rovyn Gen</div>
          <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>Hardware Supplies</div>
        </div>
      </div>

      {/* LIVE SEARCH BAR */}
      <div style={{ flex: '0 1 450px', margin: '0 24px', position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }}>
          🔍
        </span>
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search cement, pipes, paint, nails..."
          style={{
            width: '100%',
            padding: '10px 16px 10px 45px',
            borderRadius: '24px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#f8fafc',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#1e3a8a';
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#cbd5e1';
            e.target.style.backgroundColor = '#f8fafc';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* NAVIGATION LINKS & PORTAL */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <a href="#" style={{ textDecoration: 'none', color: '#1e3a8a', fontWeight: '600', fontSize: '14px' }}>Home</a>
        <a href="#contact-section" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500', fontSize: '14px', transition: 'color 0.2s' }}>Contact Us</a>
        
        {/* CART BUTTON WITH OVERLAY */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ fontSize: '22px' }}>🛒</span>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-8px',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>{totalItems}</span>
            )}
          </button>

          {/* LIVE DROPDOWN CART */}
          {isCartOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              width: '320px',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '16px',
              zIndex: 1010
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#0f172a', borderBottom: '1px solid #edf2f7', paddingBottom: '8px' }}>Your Cart</h4>
              {cart.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', margin: '20px 0' }}>No items added yet.</p>
              ) : (
                <>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '13px' }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#334155' }}>{item.name}</div>
                          <div style={{ color: '#64748b' }}>{item.quantity} x KSh {item.price}</div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>
                    <span>Total:</span>
                    <span>KSh {cartTotal.toLocaleString()}</span>
                  </div>
                  <button style={{
                    width: '100%',
                    backgroundColor: '#1e3a8a',
                    color: '#white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '6px',
                    marginTop: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Proceed to Deal Time
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* STAFF PORTAL BUTTON */}
        <button 
          onClick={handleStaffPortalClick}
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
        >
          Staff Portal
        </button>
      </div>

    </nav>
  );
}