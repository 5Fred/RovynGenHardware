import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Dashboard() {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        // Hits http://localhost:5000/api/orders/report
        const response = await API.get('/orders/report');
        setSalesData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sales report:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchSalesReport();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading statistics...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Business Overview</h2>
      
      {/* Metrics Grid */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', flex: 1 }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            KES {salesData?.totalRevenue?.toLocaleString() || 0}
          </p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', flex: 1 }}>
          <h3>Total Transactions</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {salesData?.totalTransactions || 0}
          </p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <h3>Recent Transactions</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Products</th>
            <th style={{ padding: '10px' }}>Amount</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {salesData?.recentOrders?.map((order) => (
  <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
    <td style={{ padding: '10px' }}>
      {order.items?.map(item => item.product?.name || "Hardware Item").join(', ')}
    </td>
    <td style={{ padding: '10px' }}>KES {order.totalAmount?.toLocaleString()}</td>
    <td style={{ padding: '10px' }}>{order.status || 'Completed'}</td>
  </tr>
))}
          {(!salesData?.recentOrders || salesData.recentOrders.length === 0) && (
            <tr>
              <td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>No recent orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;