import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', price: '', stock: '', description: '' });

  const fetchProducts = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch inventory data.");
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await API.delete(`/products/${id}`);
        if (response.status === 200) {
          alert("Product deleted successfully");
          fetchProducts(); // This refreshes your list automatically without reloading the page!
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      category: product.category || '',
      price: product.price,
      stock: product.stock,
      description: product.description || ''
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // If editing, send a PUT request to update the product
        await API.put(`/products/${editingProductId}`, {
          name: formData.name,
          category: formData.category || 'General',
          price: Number(formData.price),
          stock: Number(formData.stock),
          description: formData.description,
        });
        alert("Product updated successfully!");
      } else {
        // If not editing, send a POST request to add a new product
        await API.post('/products', {
          name: formData.name,
          category: formData.category || 'General',
          price: Number(formData.price),
          stock: Number(formData.stock),
          description: formData.description,
          sku: "SKU-" + Math.floor(Math.random() * 1000000)
        });
        alert("Product added successfully!");
      }

      // Reset everything back to clean state
      setFormData({ name: '', category: '', price: '', stock: '', description: '' });
      setIsEditing(false);
      setEditingProductId(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert(isEditing ? "Failed to update product." : "Failed to add new product.");
    }
  };

  // Modern UX: Filter items on the fly as the user types
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading inventory...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1a1a24', fontSize: '28px' }}>Hardware Inventory</h2>
          <p style={{ margin: '5px 0 0 0', color: '#6c757d' }}>Manage stock levels, categories, and tracking units.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '12px 20px',
            borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,123,255,0.2)'
          }}
        >
          + Add New Product
        </button>
      </div>

      {/* Modern Search Bar Row */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="🔍 Search inventory by item name or category..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', padding: '14px 20px', borderRadius: '8px', border: '1px solid #ced4da',
            boxSizing: 'border-box', fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', outline: 'none'
          }}
        />
      </div>

      {/* Inventory Table */}
      <div style={{ overflowX: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '18px' }}>Product Name</th>
              <th style={{ padding: '18px' }}>Category</th>
              <th style={{ padding: '18px' }}>Price</th>
              <th style={{ padding: '18px' }}>Stock Qty</th>
              <th style={{ padding: '18px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} style={{ borderBottom: '1px solid #dee2e6', transition: 'background 0.2s' }}>
                <td style={{ padding: '18px', fontWeight: '600', color: '#212529' }}>{product.name}</td>
                <td style={{ padding: '18px', color: '#495057' }}><span style={{ background: '#e9ecef', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>{product.category || 'General'}</span></td>
                <td style={{ padding: '18px', fontWeight: 'bold', color: '#1c7ed6' }}>KES {product.price?.toLocaleString()}</td>
                <td style={{ padding: '18px', color: '#495057' }}>{product.stock} units</td>
                <td style={{ padding: '18px' }}>
                  <span style={{
                    padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: product.stock > 10 ? '#d4edda' : product.stock > 0 ? '#fff3cd' : '#f8d7da',
                    color: product.stock > 10 ? '#155724' : product.stock > 0 ? '#856404' : '#721c24'
                  }}>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td style={{ padding: '18px', display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => handleEditClick(product)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#e8f0fe',
                  color: '#1a73e8',
                  border: '1px solid #c2dbfa',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d2e3fc'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e8f0fe'}
              >
                Edit
              </button>
              
              <button 
                onClick={() => handleDelete(product._id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#fce8e6',
                  color: '#c5221f',
                  border: '1px solid #fad2cf',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9d4d0'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fce8e6'}
              >
                Delete
              </button>
            </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#868e96' }}>
                  No matching products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* ADD PRODUCT MODAL DIALOG */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '12px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.1) '}}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '22px', color: '#212529' }}>
  {isEditing ? 'Edit Product Details' : 'Add New Stock Item'}
</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#495057' }}>Product Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ced4da' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#495057' }}>Category</label>
                <input type="text" name="category" placeholder="e.g., Construction, Plumbing" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ced4da' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#495057' }}>Description *</label>
                <input type="text" name="description" required placeholder="Short product notes" value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ced4da' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#495057' }}>Unit Price (KES) *</label>
                <input type="number" name="price" required value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ced4da' }} />
              </div>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#495057' }}>Initial Stock Qty *</label>
                <input type="number" name="stock" required value={formData.stock} onChange={handleChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ced4da' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 18px', border: '1px solid #ced4da', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontWeight: '600', color: '#495057' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 22px', border: 'none', borderRadius: '6px', background: '#28a745', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;