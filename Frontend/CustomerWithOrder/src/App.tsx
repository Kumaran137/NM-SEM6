import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';

function App() {
  return (
    <Router>
      <div>
        <h1>Customer & Order Management</h1>
        <nav>
          <ul>
            <li><Link to="/">Customers</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CustomerForm />} />
          <Route path="/orders" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;