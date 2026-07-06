import React, { useState, useEffect } from 'react';
import API from '../api/api';

function NewSale() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Find the exact product currently selected by the user
  const selectedProduct = products.find(p => p._id === selectedProductId);

  // Fetch available hardware items
  useEffect(() => {
    API.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading dropdown items:", err);
        setLoading(false);
      });
  }, []);

  // Calculate live transactional values dynamically
  const pricePerUnit = selectedProduct ? selectedProduct.price : 0;
  const availableStock = selectedProduct ? selectedProduct.stock : 0;
  const grandTotal = pricePerUnit * Number(quantity);

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId) return alert("Please select a product first");
    
    // Defensive UX Check: Block submission if stock is exceeded
    if (Number(quantity) > availableStock) {
      return alert(`Oops! You cannot sell more than the available ${availableStock} units.`);
    }

    setSubmitting(true);
    try {
      await API.post('/orders', {
        items: [{
          product: selectedProductId,
          quantity: Number(quantity),
          priceAtSale: pricePerUnit
        }],
        paymentMethod: 'Cash'
      });

      alert("🎉 Sale recorded successfully! Inventory deducted.");
      setQuantity(1);
      setSelectedProductId('');
      
      // Refresh local stock pool numbers
      const updatedProducts = await API.get('/products');
      setProducts(updatedProducts.data);
    } catch (err) {
      console.error("Error processing order checkout:", err);
      const serverMessage = err.response?.data?.message || "Failed to submit sale.";
      alert(serverMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>Loading transaction forms...</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Page Title Section */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#1a1a24', fontSize: '28px' }}>Sales Counter Terminal</h2>
        <p style={{ margin: '5px 0 0 0', color: '#6c757d' }}>Issue client sales records and process real-time inventory deductions.</p>
      </div>

      {/* Two-Column Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Hand: The Interactive Form Panel */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Record New Checkout</h3>
          
          <form onSubmit={handleSaleSubmit}>
            {/* Field 1: Choose Stock Item */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>Select Product Item</label>
              <select 
                value={selectedProductId} 
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  setQuantity(1); // Auto-reset quantity selector to 1 on item swap
                }}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '15px', outline: 'none' }}
                required
              >
                <option value="">-- Click to search stock catalog --</option>
                {products.map(p => (
                  <option key={p._id} value={p._id} disabled={p.stock <= 0}>
                    {p.name} {p.stock <= 0 ? '(OUT OF STOCK)' : `(Stock: ${p.stock} pcs - KES ${p.price.toLocaleString()})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Quantity Selector with Reactive Max Cap */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                Quantity to Sell {selectedProductId && <span style={{ color: '#007bff' }}>(Max Limit: {availableStock} units)</span>}
              </label>
              <input 
                type="number" 
                min="1" 
                max={availableStock || 1} // Front-end validation boundary
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                disabled={!selectedProductId}
                style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '15px' }}
                required
              />
            </div>

            {/* Dynamic Total Price Breakdown Card */}
            {selectedProductId && (
              <div style={{ backgroundColor: '#eef1f6', padding: '20px', borderRadius: '8px', marginBottom: '25px', borderLeft: '5px solid #007bff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#495057' }}>Unit Base Cost:</span>
                  <span style={{ fontWeight: '600' }}>KES {pricePerUnit.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#495057' }}>Quantity Order:</span>
                  <span style={{ fontWeight: '600' }}>x {quantity}</span>
                </div>
                <hr style={{ border: 0, borderTop: '1px solid #ced4da', margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#212529' }}>Grand Total Due:</span>
                  <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#28a745' }}>KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={submitting || (selectedProductId && availableStock <= 0)}
              style={{
                width: '100%',
                backgroundColor: selectedProductId && availableStock <= 0 ? '#6c757d' : '#28a745',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(40,167,69,0.15)'
              }}
            >
              {submitting ? 'Processing Order Record...' : 'Complete Sale & Deduct Stock'}
            </button>
          </form>
        </div>

        {/* Right Hand: Premium UI Graphic Layer */}
        <div style={{ height: '100%', minHeight: '430px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600" 
            alt="Hardware tools and retail stock" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '430px' }}
          />
        </div>

      </div>
    </div>
  );
}

export default NewSale;