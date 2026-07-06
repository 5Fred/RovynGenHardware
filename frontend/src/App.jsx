// src/App.jsx updates
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import NewSale from './pages/NewSale.jsx';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        <Sidebar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/new-sale" element={<NewSale />} /> {/* New Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;