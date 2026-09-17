import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function LandingPage() {
    // Access global context from App.jsx Layout — guarded so a missing/
    // misconfigured Outlet context never crashes the whole page to blank.
    const outletContext = useOutletContext();
    const cart = outletContext?.cart;
    const setCart = outletContext?.setCart;
    const products = outletContext?.products || [];

    // State to track which dynamic category dropdown is open
    const [activeCategory, setActiveCategory] = useState(null);

    // ---------------------------------------------------------------------
    // DESIGN TOKENS — industrial / safety-signage identity for a hardware
    // and construction supplier. Deep steel-blue base, hazard-orange accent,
    // condensed display type for headings (warehouse stencil feel), clean
    // utility type for body copy, monospace for prices/stock data.
    // ---------------------------------------------------------------------
    const c = {
        ink: '#0B1220',
        steel: '#101B2D',
        steelLight: '#16223A',
        line: '#243149',
        orange: '#E85D25',
        orangeDark: '#C74A18',
        amber: '#F4B400',
        concrete: '#F3F0E9',
        concreteDark: '#E7E2D6',
        slate: '#5B6472',
        ash: '#8A93A3',
        white: '#FFFFFF'
    };

    // Core Categories List Matching Admin Categories
    const supplyCategories = [
        {
            id: 'plumbing',
            icon: '🚰',
            title: 'Plumbing & Pipes',
            desc: 'Galvanized steel pipes, PVC fittings, and valves.',
            image: 'https://images.unsplash.com/photo-1607472829077-4be2ba6ea6f5?auto=format&fit=crop&q=80&w=700',
            matchKeywords: ['plumbing', 'pipes', 'pipe', 'fitting', 'valve']
        },
        {
            id: 'electrical',
            icon: '⚡',
            title: 'Electrical Supplies',
            desc: 'Conduits, wiring, circuit breakers, and switches.',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=700',
            matchKeywords: ['electrical', 'wiring', 'conduit', 'switch', 'breaker']
        },
        {
            id: 'construction',
            icon: '🏗️',
            title: 'Construction Materials',
            desc: 'Cement, reinforcement bars, and structural steel.',
            image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=700',
            matchKeywords: ['construction', 'cement', 'bar', 'steel', 'ballast']
        },
        {
            id: 'paints',
            icon: '🎨',
            title: 'Paints & Finishes',
            desc: 'Premium interior/exterior paints and painting tools.',
            image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=700',
            matchKeywords: ['paint', 'finish', 'brush', 'roller', 'thinners', 'paints']
        }
    ];

    // Hero slideshow — sliding imagery of paints, cement, steel and tools
    const heroSlides = [
        { image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600', label: 'Tools & Hardware' },
        { image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1600', label: 'Paints & Finishes' },
        { image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1600', label: 'Cement & Structural Steel' },
        { image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1600', label: 'Electrical Supplies' }
    ];
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4200);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // Reviews horizontal slider ref
    const reviewsRef = useRef(null);
    const scrollReviews = (dir) => {
        if (reviewsRef.current) {
            reviewsRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
        }
    };

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
        if (!setCart) return;
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
        <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: c.ink, backgroundColor: c.concrete }}>

            {/* Global styles: fonts, hazard-stripe signature, hover states, keyframes */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

                .rg-hazard {
                    height: 10px;
                    background: repeating-linear-gradient(
                        135deg,
                        ${c.amber} 0px, ${c.amber} 18px,
                        ${c.ink} 18px, ${c.ink} 36px
                    );
                }
                .rg-marquee-track {
                    display: flex;
                    width: max-content;
                    animation: rgScroll 26s linear infinite;
                }
                @keyframes rgScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .rg-slide {
                    transition: opacity 1.2s ease;
                }
                .rg-card {
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                }
                .rg-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 32px rgba(11, 18, 32, 0.14);
                }
                .rg-cta {
                    transition: transform 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
                }
                .rg-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(232, 93, 37, 0.35);
                }
                .rg-addbtn:not(:disabled):hover {
                    background-color: ${c.orangeDark} !important;
                }
                .rg-chevron {
                    transition: transform 0.25s ease;
                }
                .rg-dot {
                    transition: width 0.3s ease, background-color 0.3s ease;
                }
                .rg-scrollbar::-webkit-scrollbar { display: none; }
                .rg-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                @keyframes rgFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .rg-animate {
                    animation: rgFadeUp 0.6s ease both;
                }
                @media (prefers-reduced-motion: reduce) {
                    .rg-card, .rg-cta, .rg-animate, .rg-chevron, .rg-slide, .rg-marquee-track { animation: none !important; transition: none !important; }
                }
                a:focus-visible, button:focus-visible, div[role="button"]:focus-visible {
                    outline: 3px solid ${c.amber};
                    outline-offset: 2px;
                }
            `}</style>

            {/* 1. HERO — autoplaying slideshow with stenciled headline */}
            <div style={{
                position: 'relative',
                minHeight: '640px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: c.white,
                textAlign: 'center',
                padding: '0 24px',
                backgroundColor: c.ink
            }}>
                {heroSlides.map((s, i) => (
                    <div key={i} className="rg-slide" style={{
                        position: 'absolute', inset: 0,
                        opacity: slide === i ? 1 : 0,
                        zIndex: 1
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `url('${s.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(0.25) brightness(0.34) contrast(1.1)',
                            transform: slide === i ? 'scale(1.06)' : 'scale(1)',
                            transition: 'transform 6s ease'
                        }} />
                    </div>
                ))}
                {/* Directional gradient to ground the type */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: `linear-gradient(180deg, ${c.ink}CC 0%, ${c.ink}66 45%, ${c.ink}EE 100%)`,
                    zIndex: 2
                }} />

                <div className="rg-animate" style={{ position: 'relative', zIndex: 3, maxWidth: '820px', padding: '90px 0 0' }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: c.orange,
                        padding: '6px 16px 6px 12px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12px',
                        fontWeight: '600',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '22px',
                        color: c.ink
                    }}>
                        <span style={{ width: '8px', height: '8px', backgroundColor: c.ink, display: 'inline-block' }} />
                        {heroSlides[slide].label} — Now In Stock
                    </span>
                    <h1 style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 'clamp(38px, 6vw, 64px)',
                        fontWeight: '700',
                        margin: '0 0 20px 0',
                        lineHeight: '1.05',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                    }}>
                        Built To Supply<br />Every Site, On Time
                    </h1>
                    <p style={{ fontSize: '18px', color: '#D9DEE8', margin: '0 auto 36px', fontWeight: '400', lineHeight: '1.7', maxWidth: '600px' }}>
                        Structural steel, plumbing, electrical, and paint — stocked and ready for pickup or delivery across Nairobi and neighboring counties.
                    </p>
                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#supplies-section" className="rg-cta" style={{
                            textDecoration: 'none',
                            backgroundColor: c.orange,
                            color: c.white,
                            padding: '15px 30px',
                            fontWeight: '700',
                            fontSize: '14px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            display: 'inline-block'
                        }}>
                            Browse Stock
                        </a>
                        <a href="#contact-section" className="rg-cta" style={{
                            textDecoration: 'none',
                            backgroundColor: 'transparent',
                            color: c.white,
                            border: `2px solid ${c.ash}`,
                            padding: '13px 28px',
                            fontWeight: '700',
                            fontSize: '14px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            display: 'inline-block'
                        }}>
                            Get Directions
                        </a>
                    </div>
                </div>

                {/* Slide indicators */}
                <div style={{ position: 'absolute', bottom: '26px', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: '8px' }}>
                    {heroSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlide(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className="rg-dot"
                            style={{
                                width: slide === i ? '26px' : '8px', height: '8px', borderRadius: '999px',
                                backgroundColor: slide === i ? c.amber : 'rgba(255,255,255,0.5)',
                                border: 'none', cursor: 'pointer', padding: 0
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="rg-hazard" />

            {/* MARQUEE — infinite sliding strip of material categories */}
            <div style={{ backgroundColor: c.steel, padding: '14px 0', overflow: 'hidden' }}>
                <div className="rg-marquee-track">
                    {[...Array(2)].map((_, dup) => (
                        <div key={dup} style={{ display: 'flex' }}>
                            {['Cement', 'Structural Steel', 'Duracoat Paints', 'PVC Pipes', 'Electrical Cable', 'Reinforcement Bars', 'Emulsion Paints', 'Circuit Breakers'].map((item, i) => (
                                <span key={i} style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '14px', fontWeight: '600', color: c.white,
                                    padding: '0 26px', whiteSpace: 'nowrap',
                                    borderRight: `1px solid ${c.line}`,
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    textTransform: 'uppercase', letterSpacing: '0.5px'
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c.amber }} />
                                    {item}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* WHY CHOOSE US — steel-plate feature cards */}
            <div style={{ padding: '84px 24px', backgroundColor: c.white }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '54px' }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '600', color: c.orange, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            The Rovyn Gen Standard
                        </span>
                        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '700', margin: '10px 0 12px 0', color: c.ink, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                            Why Partner With Us
                        </h2>
                        <p style={{ color: c.slate, fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: '1.6' }}>
                            Unmatched standards in building material distribution across Nairobi and neighboring counties.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', backgroundColor: c.concreteDark }}>
                        {[
                            { icon: '🏬', title: 'Fully Equipped Stock', desc: 'Find all building, plumbing, electrical, and paint materials under one roof. No delays, no missing stock items.' },
                            { icon: '⚡', title: 'Real-Time Integration', desc: 'Our live inventory synchronization lets clients verify stock availability before purchasing.' },
                            { icon: '🚚', title: 'Prompt Delivery', desc: 'Reliable logistics partners make sure structural steel or delicate paints reach your site safely, on time.' }
                        ].map((f, i) => (
                            <div key={i} className="rg-card" style={{ padding: '38px 30px', backgroundColor: c.white, textAlign: 'left' }}>
                                <div style={{
                                    width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: c.ink, fontSize: '24px', marginBottom: '22px'
                                }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '19px', fontWeight: '600', color: c.ink, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                                    {f.title}
                                </h3>
                                <p style={{ color: c.slate, fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. WHAT WE SUPPLY — category cards with real imagery */}
            <div id="supplies-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '84px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '54px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '600', color: c.orange, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        Live Inventory
                    </span>
                    <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '700', margin: '10px 0 12px 0', color: c.ink, textTransform: 'uppercase' }}>
                        What We Supply
                    </h2>
                    <p style={{ fontSize: '16px', color: c.slate, maxWidth: '560px', margin: '0 auto', lineHeight: '1.6' }}>
                        Tap any category to see real-time available stock, linked directly to our inventory portal.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '26px' }}>
                    {supplyCategories.map((cat) => {
                        const associatedItems = getProductsForCategory(cat);
                        const isOpen = activeCategory === cat.id;

                        return (
                            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* Master Category Card Header Block */}
                                <div
                                    onClick={() => toggleCategory(cat.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCategory(cat.id); }}
                                    className="rg-card"
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backgroundColor: c.ink,
                                        borderRadius: '4px',
                                        border: isOpen ? `2px solid ${c.orange}` : `2px solid transparent`,
                                        cursor: 'pointer',
                                        minHeight: '220px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        backgroundImage: `url('${cat.image}')`,
                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                        filter: 'brightness(0.55) saturate(1.05)'
                                    }} />
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: `linear-gradient(180deg, transparent 30%, ${c.ink}F2 92%)`
                                    }} />
                                    <div style={{ position: 'relative', padding: '20px 22px' }}>
                                        <div style={{ fontSize: '30px', marginBottom: '10px' }}>{cat.icon}</div>
                                        <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '19px', fontWeight: '600', margin: '0 0 6px 0', color: c.white, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                                            {cat.title}
                                        </h3>
                                        <p style={{ fontSize: '13px', color: '#C7CEDB', margin: '0 0 16px 0', lineHeight: '1.5' }}>{cat.desc}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '11px', fontWeight: '600', color: c.ink,
                                                backgroundColor: c.amber, padding: '4px 10px'
                                            }}>
                                                {associatedItems.length} IN STOCK
                                            </span>
                                            <span className="rg-chevron" style={{ fontSize: '13px', color: c.white, transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                                                ▼
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* DYNAMIC DROPDOWN PORTAL LIST CONTAINER */}
                                {isOpen && (
                                    <div style={{
                                        backgroundColor: c.white,
                                        border: `1px solid ${c.concreteDark}`,
                                        borderTop: 'none',
                                        borderRadius: '0 0 4px 4px',
                                        padding: '18px 16px',
                                        boxShadow: '0 12px 20px rgba(11,18,32,0.06)',
                                        maxHeight: '350px',
                                        overflowY: 'auto'
                                    }}>
                                        {associatedItems.length === 0 ? (
                                            <p style={{ fontSize: '13px', color: c.ash, textAlign: 'center', margin: '16px 0' }}>
                                                No items uploaded under this section yet.
                                            </p>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {associatedItems.map((product) => (
                                                    <div
                                                        key={product._id || product.id}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '12px',
                                                            borderRadius: '4px',
                                                            backgroundColor: c.concrete,
                                                            borderLeft: `3px solid ${c.orange}`
                                                        }}
                                                    >
                                                        <div style={{ flex: '1', marginRight: '8px' }}>
                                                            <div style={{ fontWeight: '600', fontSize: '14px', color: c.ink }}>{product.name}</div>
                                                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#1E8E5A', fontWeight: '600', marginTop: '3px' }}>
                                                                KSh {(product.price || 0).toLocaleString()}
                                                            </div>
                                                            {product.stock !== undefined && (
                                                                <div style={{ fontSize: '11px', color: product.stock > 0 ? c.slate : '#D64545', marginTop: '3px' }}>
                                                                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            disabled={product.stock === 0}
                                                            className="rg-addbtn"
                                                            style={{
                                                                backgroundColor: product.stock === 0 ? '#CBD2DC' : c.orange,
                                                                color: c.white,
                                                                border: 'none',
                                                                padding: '9px 14px',
                                                                borderRadius: '4px',
                                                                fontSize: '12px',
                                                                fontWeight: '700',
                                                                letterSpacing: '0.3px',
                                                                textTransform: 'uppercase',
                                                                cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                                                            }}
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

            <div className="rg-hazard" />

            {/* CUSTOMER REVIEWS — sliding horizontal carousel */}
            <div style={{ backgroundColor: c.steel, padding: '84px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}>
                        <div>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '600', color: c.amber, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                                Trusted By Contractors
                            </span>
                            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '700', margin: '10px 0 0 0', color: c.white, textTransform: 'uppercase' }}>
                                Word On The Street
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: '700', color: c.white, marginTop: '10px' }}>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>4.3</span>
                                <span style={{ color: c.amber }}>★★★★★</span>
                                <span style={{ color: c.ash, fontSize: '13px', fontWeight: '400' }}>(Google Reviews)</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => scrollReviews(-1)} aria-label="Previous review" style={navBtnStyle(c)}>←</button>
                            <button onClick={() => scrollReviews(1)} aria-label="Next review" style={navBtnStyle(c)}>→</button>
                        </div>
                    </div>
                </div>

                <div ref={reviewsRef} className="rg-scrollbar" style={{
                    display: 'flex', gap: '2px', overflowX: 'auto', scrollSnapType: 'x mandatory',
                    padding: '0 24px 10px', maxWidth: '1200px', margin: '0 auto'
                }}>
                    {[
                        { name: 'John Nduati', tag: 'Local Guide • Verified Customer', stars: 5, initials: 'JN', color: c.orange,
                          text: 'Very well equipped general hardware. All building materials under one roof — water tanks, nails, paints, wheelbarrows, water taps, and premium piping accessories.' },
                        { name: 'Juma Antony', tag: 'Contractor • Verified Buyer', stars: 5, initials: 'JA', color: c.amber,
                          text: 'Excellent customer service and genuine construction materials. The online inventory matching system makes pre-ordering stress-free for structural builders.' },
                        { name: 'Edwin Kihara', tag: 'Local Guide • Kasarani Resident', stars: 4, initials: 'EK', color: '#4C8DFF',
                          text: 'Conveniently located just a few meters from CarWash Stage in Kasarani. Wide selection of building paints and very reliable technical support.' }
                    ].map((r, i) => (
                        <div key={i} style={{ flex: '0 0 340px', scrollSnapAlign: 'start', backgroundColor: c.ink, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: c.amber, fontSize: '16px', marginBottom: '14px', letterSpacing: '2px' }}>
                                    {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                                </div>
                                <p style={{ color: '#D9DEE8', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                                    {r.text}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '4px', backgroundColor: r.color,
                                    color: c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace"
                                }}>
                                    {r.initials}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: c.white }}>{r.name}</h4>
                                    <span style={{ fontSize: '12px', color: c.ash }}>{r.tag}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* LOCATION & HOURS — blueprint-grid map treatment */}
            <div style={{ backgroundColor: c.white, padding: '84px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>

                    <div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '600', color: c.orange, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                            Find Us Locally
                        </span>
                        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: '700', margin: '12px 0 20px 0', color: c.ink, textTransform: 'uppercase' }}>
                            Visit Our Warehouse
                        </h2>
                        <p style={{ color: c.slate, fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
                            Come visit our branch at Kasarani for real-time order pickups, direct negotiations, and structural material consultation.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            {[
                                { icon: '📍', title: 'Address Location', body: 'Near CarWash Stage, Kasarani, Nairobi, Kenya' },
                                { icon: '📞', title: 'Call / WhatsApp', body: '0727 417512 / +254 700 000000' },
                                { icon: '🕒', title: 'Operational Hours', body: 'Mon – Sat: 7:30 AM – 6:00 PM (Closed Sundays)' }
                            ].map((row, i) => (
                                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '22px', width: '40px', height: '40px', backgroundColor: c.concrete, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{row.icon}</span>
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 4px 0', color: c.ink }}>{row.title}</h4>
                                        <p style={{ margin: 0, color: c.slate, fontSize: '14px' }}>{row.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Blueprint-style location panel (no external map dependency) */}
                    <div style={{
                        borderRadius: '4px',
                        overflow: 'hidden',
                        height: '360px',
                        position: 'relative',
                        backgroundColor: c.steel,
                        border: `1px solid ${c.line}`
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `linear-gradient(${c.line}66 1px, transparent 1px), linear-gradient(90deg, ${c.line}66 1px, transparent 1px)`,
                            backgroundSize: '28px 28px'
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '24px', textAlign: 'center'
                        }}>
                            <div style={{
                                width: '54px', height: '54px', borderRadius: '50%', backgroundColor: c.orange,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '18px',
                                boxShadow: `0 0 0 8px ${c.orange}26`
                            }}>
                                📍
                            </div>
                            <div style={{
                                backgroundColor: c.white,
                                padding: '16px 22px',
                                borderRadius: '4px',
                                maxWidth: '280px'
                            }}>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: c.ink }}>Rovyn Gen Hardware</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: c.slate }}>A few meters from CarWash Stage, Kasarani</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="rg-hazard" />

            {/* 3. FOOTER / CONTACT */}
            <div id="contact-section" style={{ backgroundColor: c.ink, color: c.white, padding: '64px 24px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>

                    <div style={{ flex: '1 1 308px' }}>
                        <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase' }}>
                            Rovyn Gen Hardware
                        </h3>
                        <p style={{ color: c.ash, fontSize: '14px', lineHeight: '1.7' }}>
                            Premium building partners providing top-tier items from manufacturers directly to your construction sites.
                        </p>
                    </div>

                    <div style={{ flex: '1 1 300px' }}>
                        <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1.5px', color: c.amber }}>
                            Contact Details
                        </h3>
                        <p style={{ color: c.ash, fontSize: '14px', margin: '0 0 8px 0' }}>📍 Kasarani, Nairobi, Kenya</p>
                        <p style={{ color: c.ash, fontSize: '14px', margin: '0 0 8px 0' }}>📞 0727 417512 / +254 700 000000</p>
                        <p style={{ color: c.ash, fontSize: '14px', margin: '0' }}>✉️ info@rovyngen.co.ke</p>
                    </div>

                </div>
                <div style={{ maxWidth: '1200px', margin: '40px auto 0', borderTop: `1px solid ${c.line}`, paddingTop: '20px' }}>
                    <p style={{ color: c.slate, fontSize: '12px', margin: 0 }}>© {new Date().getFullYear()} Rovyn Gen Hardware. All rights reserved.</p>
                </div>
            </div>

        </div>
    );
}

function navBtnStyle(c) {
    return {
        width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${c.line}`,
        backgroundColor: 'transparent', color: c.white, cursor: 'pointer', fontSize: '16px'
    };
}