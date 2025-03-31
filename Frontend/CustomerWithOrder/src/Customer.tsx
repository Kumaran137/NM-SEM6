import React, { useState, useEffect } from 'react';

type Customer = {
  id?: number;
  name: string;
  email: string;
};

const API_URL = 'http://localhost:8080/customers';

const CustomerForm: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({ name: '', email: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch(API_URL);
    const data: Customer[] = await response.json();
    setCustomers(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (customer.id) {
      await fetch(`${API_URL}/${customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
    }
    setCustomer({ name: '', email: '' });
    fetchCustomers();
  };

  const handleEdit = (cust: Customer) => {
    setCustomer(cust);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchCustomers();
  };

  return (
    <div>
      <h2>Customer Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={customer.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">{customer.id ? 'Update' : 'Add'}</button>
      </form>

      <h3>Customer List</h3>
      <ul>
        {customers.map((cust) => (
          <li key={cust.id}>
            {cust.name} - {cust.email}
            <button onClick={() => handleEdit(cust)}>Edit</button>
            <button onClick={() => handleDelete(cust.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerForm;
