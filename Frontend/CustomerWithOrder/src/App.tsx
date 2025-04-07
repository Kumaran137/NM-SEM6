import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';

import './index.css';
function App() {
  
return (
  <Router>
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            Customer & Order Management
          </h1>
          <nav>
            <ul className="flex space-x-6 text-lg">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 px-6">
        <Routes>
          <Route path="/" element={<CustomerForm />} />
          <Route path="/orders" element={<OrderForm />} />
        </Routes>
      </main>
    </div>
  </Router>
);
}

export default App;
