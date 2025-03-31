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
      customer: { id: selectedCustomer },  // ✅ Correct format
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
    <div>
      <h2>Order Management</h2>
      <h3>Select Customer</h3>
      <select onChange={handleCustomerSelect} value={selectedCustomer || ''}>
        <option value="">Select Customer</option>
        {customers.map((cust) => (
          <option key={cust.id} value={cust.id}>{cust.name}</option>
        ))}
      </select>
      
      <h3>Add Products</h3>
      <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} placeholder="Product Name" required />
      <input type="number" name="qty" value={newProduct.qty} onChange={handleProductChange} placeholder="Quantity" required />
      <input type="number" name="price" value={newProduct.price} onChange={handleProductChange} placeholder="Price" required />
      <button type="button" onClick={addProduct}>Add Product</button>

      <h3>Product List</h3>
      <ul>
        {products.map((prod, index) => (
          <li key={index}>{prod.name} - Qty: {prod.qty} - Price: {prod.price} - Total: {prod.qty * prod.price}</li>
        ))}
      </ul>
      
      <h3>Overall Total: {calculateTotal()}</h3>
      
      <button type="button" onClick={submitOrder}>Submit Order</button>
      {orderId && <p>Order successfully placed! Order ID: {orderId}</p>}
    </div>
  );
};

export default OrderForm;
