import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Public Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

// Admin Components & Pages
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import NewSale from './pages/NewSale';

// 1. PUBLIC LAYOUT WRAPPER
// Receives cart and setCart to feed the Navbar, and passes them to the LandingPage via context
const PublicLayout = ({ cart, setCart, products, setFilteredProducts }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar gets the full cart state and search controls */}
      <Navbar 
        cart={cart} 
        setCart={setCart} 
        products={products} 
        setFilteredProducts={setFilteredProducts}
      />
      <main style={{ flex: 1 }}>
        {/* React Router context lets pages inside this layout easily add items to the cart */}
        <Outlet context={{ cart, setCart, products, setFilteredProducts }} />
      </main>
      <Footer />
    </div>
  );
};

// 2. ADMIN LAYOUT WRAPPER
const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  // Global States for Cart and Live Search Data
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // Will hold products fetched from MongoDB
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for display

  return (
    <Router>
      <Routes>
        
        {/* --- Public Paths --- */}
        {/* We pass our states down into the layout wrapper here */}
        <Route element={
          <PublicLayout 
            cart={cart} 
            setCart={setCart} 
            products={products} 
            setFilteredProducts={setFilteredProducts} 
          />
        }>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Login />} />
        </Route>

        {/* --- Admin Paths --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Dashboard />} />       
          <Route path="products" element={<Products />} />  
          <Route path="new-sale" element={<NewSale />} />  
        </Route>

      </Routes>
    </Router>
  );
}

export default App;