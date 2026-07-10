import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, setCart } = useOutletContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: ''
  });

  // Calculate Subtotal
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 5000 ? 0 : 300; 
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");

    const orderData = {
      customer: formData,
      items: cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      shippingFee,
      total,
      status: 'Pending'
    };

    try {
      // POST the order details to your backend Node.js server
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart state globally
        navigate('/'); // Redirect back to landing page
      } else {
        alert("Something went wrong processing your order.");
      }
    } catch (error) {
      console.error("Order processing error:", error);
    }
  };

  return (
    <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', gap: '40px' }}>
      {/* Left Column: Form Details */}
      <div style={{ flex: 1 }}>
        <form onSubmit={handlePlaceOrder}>
          ### Contact Information
          <input 
            type="text" name="emailOrPhone" placeholder="Email or mobile phone number" required
            style={inputStyle} value={formData.emailOrPhone} onChange={handleInputChange} 
          />

          ### Delivery Details
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <input type="text" name="firstName" placeholder="First name" required style={inputStyle} value={formData.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last name" required style={inputStyle} value={formData.lastName} onChange={handleInputChange} />
          </div>
          <input type="text" name="address" placeholder="Address / Location" required style={{...inputStyle, marginTop: '15px'}} value={formData.address} onChange={handleInputChange} />
          <input type="text" name="city" placeholder="City" required style={{...inputStyle, marginTop: '15px'}} value={formData.city} onChange={handleInputChange} />
          <input type="text" name="phone" placeholder="Phone number for M-Pesa tracking" required style={{...inputStyle, marginTop: '15px'}} value={formData.phone} onChange={handleInputChange} />
          
          <button type="submit" style={submitBtnStyle}>Complete Order</button>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div style={{ width: '400px', background: '#f9f9f9', padding: '24px', borderRadius: '8px' }}>
        ### Your Order
        <hr />
        {cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'between', marginY: '15px', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name} <span style={{fontSize: '12px', color: '#555'}}>x{item.quantity}</span></p>
            </div>
            <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <hr />
        <div style={summaryRow}><p>Subtotal</p><span>KSh {subtotal.toLocaleString()}</span></div>
        <div style={summaryRow}><p>Shipping</p><span>{shippingFee === 0 ? "FREE" : `KSh ${shippingFee}`}</span></div>
        <hr />
        <div style={{...summaryRow, fontWeight: 'bold', fontSize: '18px'}}><p>Total</p><span>KSh {total.toLocaleString()}</span></div>
      </div>
    </div>
  );
}

// Quick Inline Styles to keep things clean
const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' };
const submitBtnStyle = { width: '100%', padding: '14px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' };
const summaryRow = { display: 'flex', justifyContent: 'space-between', margin: '8px 0' };