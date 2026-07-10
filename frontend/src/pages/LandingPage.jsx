import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function LandingPage() {
  // Access global context from App.jsx Layout
  const { cart, setCart, products } = useOutletContext();
  
  // State to track which dynamic category dropdown is open
  const [activeCategory, setActiveCategory] = useState(null);

  // Core Categories List Matching Admin Categories
  const supplyCategories = [
    {
      id: 'plumbing',
      icon: '🚰',
      title: 'Plumbing & Pipes',
      desc: 'Galvanized steel pipes, PVC fittings, and valves.',
      matchKeywords: ['plumbing', 'pipes', 'pipe', 'fitting', 'valve']
    },
    {
      id: 'electrical',
      icon: '⚡',
      title: 'Electrical Supplies',
      desc: 'Conduits, wiring, circuit breakers, and switches.',
      matchKeywords: ['electrical', 'wiring', 'conduit', 'switch', 'breaker']
    },
    {
      id: 'construction',
      icon: '🏗️',
      title: 'Construction Materials',
      desc: 'Cement, reinforcement bars, and structural steel.',
      matchKeywords: ['construction', 'cement', 'bar', 'steel', 'ballast']
    },
    {
      id: 'paints',
      icon: '🎨',
      title: 'Paints & Finishes',
      desc: 'Premium interior/exterior paints and painting tools.',
      matchKeywords: ['paint', 'finish', 'brush', 'roller', 'thinners', 'paints']
    }
  ];

  // Helper function to safely extract products belonging to each specific section
const getProductsForCategory = (cat) => {
  if (!products || products.length === 0) return [];
  
  return products.filter(p => {
    const productCat = (p.category || '').toLowerCase();
    const productName = (p.name || '').toLowerCase();
    const targetCatId = (cat.id || '').toLowerCase();

    // Match if category matches exactly, or contains any core keywords
    return productCat === targetCatId || 
           (cat.matchKeywords && cat.matchKeywords.some(keyword => {
             const cleanKeyword = keyword.toLowerCase();
             return productCat.includes(cleanKeyword) || productName.includes(cleanKeyword);
           }));
  });
};

  // Add to Cart Logic Functionality
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      // Look up unique ID match (flexible enough to read _id from MongoDB or standard id)
      const productId = product._id || product.id;
      const existingItem = prevCart.find((item) => (item._id || item.id) === productId);
      
      if (existingItem) {
        return prevCart.map((item) =>
          (item._id || item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, id: productId, quantity: 1 }];
    });
  };

  const toggleCategory = (catId) => {
    setActiveCategory(activeCategory === catId ? null : catId);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a', backgroundColor: '#f8fafc' }}>
      
      {/* 1. HERO BANNER SECTION WITH BLUR IMAGE BACKGROUND */}
      <div style={{
        position: 'relative',
        height: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#ffffff',
        textAlign: 'center',
        padding: '0 24px'
      }}>
        {/* Blurred Layer Background Wrapper */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://www.duracoat.com/sites/default/files/2024-10/ultima-full-range-desktop-banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px) brightness(0.45)', // Adds overlay darkness and elegant blur
          transform: 'scale(1.05)', // Fixes edge leaks from blurring
          zIndex: 1
        }} />

        {/* Hero Foreground Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <span style={{
            backgroundColor: 'rgba(30, 58, 138, 0.8)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            Welcome to Rovyn Gen
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.1', letterSpacing: '-0.5px' }}>
            Premium Hardware & Engineering Solutions
          </h1>
          <p style={{ fontSize: '18px', color: '#e2e8f0', margin: '0 0 32px 0', fontWeight: '400' }}>
            Your premium partner for structural steel, building materials, paints, and reliable industrial electrical equipment.
          </p>
          <a href="#supplies-section" style={{
            textDecoration: 'none',
            backgroundColor: '#ffffff',
            color: '#1e3a8a',
            padding: '14px 28px',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '15px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Explore Categories
          </a>
        </div>
      </div>

      {/* 2. WHAT WE SUPPLY CATEGORIES SECTION */}
      <div id="supplies-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0', color: '#0f172a' }}>What We Supply</h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Click on any category block below to instantly view real-time available stock linked directly from our inventory portal.
          </p>
        </div>

        {/* Dynamic Category Card Grid Setup */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {supplyCategories.map((cat) => {
            const associatedItems = getProductsForCategory(cat);
            const isOpen = activeCategory === cat.id;

            return (
              <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Master Category Card Header Block */}
                <div 
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '30px 24px',
                    borderRadius: '16px',
                    border: isOpen ? '2px solid #1e3a8a' : '1px solid #e2e8f0',
                    boxShadow: isOpen ? '0 10px 25px rgba(30, 58, 138, 0.08)' : '0 4px 6px rgba(0,0,0,0.01)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '19px', fontWeight: '700', margin: '0 0 8px 0', color: '#1e293b' }}>{cat.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>{cat.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#1e3a8a', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '12px' }}>
    {associatedItems.length} Products Available
</span>
                    <span style={{ fontSize: '14px', color: '#64748b', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* DYNAMIC DROPDOWN PORTAL LIST CONTAINER */}
                {isOpen && (
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderTop: 'none',
                    borderRadius: '0 0 16px 16px',
                    marginTop: '-8px',
                    padding: '20px 16px',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.05)',
                    maxHeight: '350px',
                    overflowY: 'auto'
                  }}>
                    {associatedItems.length === 0 ? (
                      <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', margin: '16px 0' }}>
                        No items uploaded under this section yet.
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {associatedItems.map((product) => (
                          <div 
                            key={product._id || product.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px',
                              borderRadius: '8px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #f1f5f9'
                            }}
                          >
                            <div style={{ flex: '1', marginRight: '8px' }}>
                              <div style={{ fontWeight: '600', fontSize: '14px', color: '#334155' }}>{product.name}</div>
                              <div style={{ fontSize: '13px', color: '#059669', fontWeight: '700', marginTop: '2px' }}>
                                KSh {(product.price || 0).toLocaleString()}
                              </div>
                              {product.stock !== undefined && (
                                <div style={{ fontSize: '11px', color: product.stock > 0 ? '#64748b' : '#ef4444', marginTop: '2px' }}>
                                  {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                </div>
                              )}
                            </div>
                            
                            {/* LIVE ADD TO CART INTERACTIVE ACTION BUTTON */}
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock === 0}
                              style={{
                                backgroundColor: product.stock === 0 ? '#cbd5e1' : '#1e3a8a',
                                color: '#ffffff',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '#6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => { if(product.stock !== 0) e.target.style.backgroundColor = '#1d4ed8'; }}
                              onMouseLeave={(e) => { if(product.stock !== 0) e.target.style.backgroundColor = '#1e3a8a'; }}
                            >
                              {product.stock === 0 ? 'Empty' : 'Add +'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT US SECTION FOOTER BLOCK ANCHOR */}
      <div id="contact-section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Rovyn Gen Hardware</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
              Premium building partners providing top tier items from manufacturers directly to your construction sites.
            </p>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Details</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>📍 Location: Nairobi, Kenya</p>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>📞 Phone: +254 700 000000</p>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>✉️ Email: info@rovyngen.co.ke</p>
          </div>
        </div>
      </div>

    </div>
  );
}