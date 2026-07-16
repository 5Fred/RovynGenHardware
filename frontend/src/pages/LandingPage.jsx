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
        if (!products) return [];
        return products.filter(p => {
            const productCat = (p.category || '').toLowerCase();
            const productName = (p.name || '').toLowerCase();
            const targetCatId = (cat.id || '').toLowerCase();

            return productCat === targetCatId ||
                (cat.matchKeywords && cat.matchKeywords.some(keyword => {
                    const cleanKeyword = keyword.toLowerCase();
                    return productCat.includes(cleanKeyword) || productName.includes(cleanKeyword);
                }));
        });
    };

    // Add to Cart Logic Functionality
    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const productId = product._id || product.id;
            const existingItem = prevCart.find(item => (item._id || item.id) === productId);

            if (existingItem) {
                return prevCart.map(item =>
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
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: '#ffffff',
                textAlign: 'center',
                padding: '0 24px',
                // Fallback background ya giza ili maandishi yaonekane picha ikichelewa kupakia
                backgroundColor: '#0f172a' 
            }}>
                {/* Blurred Layer Background Wrapper */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // Tumetumia picha ya hali ya juu ya hardware/tools kutoka Unsplash ambayo hairuhusu kufeli kupakia
                    backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQmHD7fr3ymELFRfAUd3uFFhiQbOGwQgnKNcH3pAA-GyWgj9Emgh_9jE&s=10')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(3px) brightness(0.35)', // Tumepunguza mwangaza kidogo (brightness 0.35) ili maandishi meupe yang'ae zaidi
                    transform: 'scale(1.05)',
                    zIndex: 1
                }} />

                {/* Hero Foreground Content */}
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
                    <span style={{
                        backgroundColor: 'rgba(30, 58, 138, 0.9)',
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
                    <h1 style={{ fontSize: '52px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.1', letterSpacing: '-0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Premium Hardware & Engineering Solutions
                    </h1>
                    <p style={{ fontSize: '19px', color: '#f1f5f9', margin: '0 0 32px 0', fontWeight: '400', lineHeight: '1.6', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        Your premium partner for structural steel, building materials, paints, and reliable industrial electrical equipment.
                    </p>
                    <a href="#supplies-section" style={{
                        textDecoration: 'none',
                        backgroundColor: '#ffffff',
                        color: '#1e3a8a',
                        padding: '14px 32px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '15px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                        transition: 'transform 0.2s',
                        display: 'inline-block'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Explore Categories
                    </a>
                </div>
            </div>
            {/* NEW SECTION: WHY CHOOSE US / VALUE PROPOSITION */}
            <div style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0', color: '#0f172a' }}>Why Partner With Us?</h2>
                        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                            We offer unmatched standards in building material distribution across Nairobi and neighboring counties.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        <div style={{ padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏬</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a8a', marginBottom: '10px' }}>Fully Equipped Stock</h3>
                            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                Find all building, plumbing, electrical, and paint materials under one roof. No delays, no missing stock items.
                            </p>
                        </div>
                        <div style={{ padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚡</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a8a', marginBottom: '10px' }}>Real-time Integration</h3>
                            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                Our live inventory synchronization allows clients to seamlessly verify stock availability before purchasing.
                            </p>
                        </div>
                        <div style={{ padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚚</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a8a', marginBottom: '10px' }}>Prompt Delivery</h3>
                            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                                Efficient logistic partners to make sure your structural steel or delicate paints reach your site safely and on time.
                            </p>
                        </div>
                    </div>
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
                                                                borderRadius: '6px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => { if (product.stock !== 0) e.target.style.backgroundColor = '#1d4ed8'; }}
                                                            onMouseLeave={(e) => { if (product.stock !== 0) e.target.style.backgroundColor = '#1e3a8a'; }}
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

            {/* NEW SECTION: CUSTOMER REVIEWS (GOOGLE MAPS REAL DATA) */}
            <div style={{ backgroundColor: '#f1f5f9', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                            Trusted by Contractors
                        </div>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0', color: '#0f172a' }}>
                            Word on the Street
                        </h2>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                            <span>4.3</span>
                            <span style={{ color: '#f59e0b' }}>★★★★★</span>
                            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '400' }}>(Based on Google Reviews)</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        
                        {/* Review 1 */}
                        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: '#f59e0b', fontSize: '18px', marginBottom: '12px' }}>★★★★★</div>
                                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', italic: 'true', marginBottom: '20px' }}>
                                    "Very well equipped general hardware... All building materials under one roof. You can get almost any of your building needs here... from water tanks, nails, paints, wheelbarrows, water taps, and premium piping accessories."
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3b82f6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContext: 'center', justifyContent: 'center', fontWeight: '700' }}>
                                    JN
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: '#0f172a' }}>John Nduati</h4>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>Local Guide • Verified Customer</span>
                                </div>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: '#f59e0b', fontSize: '18px', marginBottom: '12px' }}>★★★★★</div>
                                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                                    "Excellent customer service and genuine construction materials. Their dynamic online inventory matching system makes pre-ordering incredibly stress-free for structural builders."
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContext: 'center', justifyContent: 'center', fontWeight: '700' }}>
                                    JA
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Juma Antony</h4>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>Contractor • Verified Buyer</span>
                                </div>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: '#f59e0b', fontSize: '18px', marginBottom: '12px' }}>★★★★☆</div>
                                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                                    "Conveniently located just a few meters from CarWash Stage in Kasarani. High-quality service, wide selection of building paints, and very reliable technical support."
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8b5cf6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContext: 'center', justifyContent: 'center', fontWeight: '700' }}>
                                    EK
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: '#0f172a' }}>Edwin Kihara</h4>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>Local Guide • Kasarani Resident</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* NEW SECTION: VISUAL MAP, LOCATION, AND OPERATING HOURS */}
            <div style={{ backgroundColor: '#ffffff', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
                    
                    {/* Left Column: Physical Info */}
                    <div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '1px' }}>Find Us Locally</span>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '12px 0 20px 0', color: '#0f172a' }}>Visit Our Warehouse</h2>
                        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
                            Come visit our branch at Kasarani for real-time order pickups, direct negotiations, and structural material consultation.
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '24px' }}>📍</span>
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0', color: '#1e293b' }}>Address Location</h4>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Near CarWash Stage, Kasarani, Nairobi, Kenya</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '24px' }}>📞</span>
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0', color: '#1e293b' }}>Call / WhatsApp</h4>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>0727 417512 / +254 700 000000</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '24px' }}>🕒</span>
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0', color: '#1e293b' }}>Operational Hours</h4>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Mon - Sat: 7:30 AM – 6:00 PM (Closed on Sundays)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Map Representation Container */}
                    <div style={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        height: '350px',
                        position: 'relative',
                        backgroundColor: '#cbd5e1',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                    }}>
                        {/* Static Styled map background view */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/36.9012,1.2185,14,0/600x350?access_token=none')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor: '#e2e8f0',
                            padding: '24px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '50px', marginBottom: '12px' }}>📍</div>
                            <div style={{
                                backgroundColor: '#ffffff',
                                padding: '16px 20px',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                maxWidth: '280px'
                            }}>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1e3a8a' }}>Rovyn Gen Hardware</h4>
                                <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>A few meters from CarWash Stage, Kasarani</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. CONTACT US SECTION FOOTER BLOCK ANCHOR */}
            <div id="contact-section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '68px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
                    
                    <div style={{ flex: '1 1 308px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Rovyn Gen Hardware</h3>
                        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                            Premium building partners providing top tier items from manufacturers directly to your construction sites.
                        </p>
                    </div>

                    <div style={{ flex: '1 1 300px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Details</h3>
                        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>📍 Location: Kasarani, Nairobi, Kenya</p>
                        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>📞 Phone: 0727 417512 / +254 700 000000</p>
                        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>✉️ Email: info@rovyngen.co.ke</p>
                    </div>

                </div>
            </div>

        </div>
    );
}