
import React, { useState, useEffect } from 'react';

type Customer = {
  id?: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  qty: number;
  price: number;
};

const API_URL = 'http://localhost:8080';

const OrderForm: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', qty: 1, price: 0 });
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
    const data: Customer[] = await response.json();
    setCustomers(data);
  };

  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomer(Number(e.target.value));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ id: 0, name: '', qty: 1, price: 0 });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.qty * product.price, 0);
  };

  const submitOrder = async () => {
    if (!selectedCustomer || products.length === 0) {
      alert("Please select a customer and add at least one product.");
      return;
    }

    const orders = products.map(product => ({
      customer: { id: selectedCustomer },
      productName: product.name,
      quantity: product.qty,
      price: product.price
    }));

    const response = await fetch(`${API_URL}/orders/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orders),
    });

    const result = await response.json();

    setOrderId(result.id);
    alert(`Order submitted successfully!`);
    setProducts([]);
    setSelectedCustomer(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Management</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
        <select
          onChange={handleCustomerSelect}
          value={selectedCustomer || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>{cust.name}</option>
          ))}
        </select>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">Add Product</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleProductChange}
          placeholder="Product Name"
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <input
          type="number"
          name="qty"
          value={newProduct.qty}
          onChange={handleProductChange}
          placeholder="Quantity"
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleProductChange}
          placeholder="Price"
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <button
        onClick={addProduct}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium mb-6"
      >
        Add Product
      </button>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">Product List</h3>
      {products.length === 0 ? (
        <p className="text-sm text-gray-500">No products added yet.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {products.map((prod, index) => (
            <li key={index} className="bg-gray-50 px-4 py-3 rounded-md border border-gray-200 text-gray-700">
              <span className="font-medium">{prod.name}</span> — Qty: {prod.qty}, Price: ₹{prod.price}, Total: ₹{prod.qty * prod.price}
            </li>
          ))}
        </ul>
      )}

      <div className="mb-6 text-right font-semibold text-lg text-gray-800">
        Total: ₹{calculateTotal()}
      </div>

      <button
        onClick={submitOrder}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-semibold"
      >
        Submit Order
      </button>

      {orderId && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded-md text-center">
          Order placed successfully! Order ID: {orderId}
        </div>
      )}
    </div>
  );
};

export default OrderForm;
