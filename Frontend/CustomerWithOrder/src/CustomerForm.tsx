import React, { useState, useEffect } from 'react';
import "./index.css"

type Customer = {
  id?: number;
  name: string;
  email: string;
};

const API_URL = 'http://localhost:8080/customers';

const CustomerForm: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | null}>({message: '', type: null});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: Customer[] = await response.json();
      setCustomers(data);
    } catch (error) {
      setNotification({message: 'Failed to fetch customers', type: 'error'});
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (customer.id) {
        await fetch(`${API_URL}/${customer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
        setNotification({message: 'Customer updated successfully', type: 'success'});
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
        setNotification({message: 'Customer added successfully', type: 'success'});
      }
      setCustomer({ name: '', email: '' });
      fetchCustomers();
    } catch (error) {
      setNotification({message: 'Operation failed', type: 'error'});
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (cust: Customer) => {
    setCustomer(cust);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setNotification({message: 'Customer deleted successfully', type: 'success'});
      fetchCustomers();
    } catch (error) {
      setNotification({message: 'Failed to delete customer', type: 'error'});
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Customer Management</h2>
      
      {/* Notification */}
      {notification.type && (
        <div 
          className={`mb-4 p-3 rounded-md ${
            notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
            'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Enter customer email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : customer.id ? 'Update Customer' : 'Add Customer'}
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Customer List</h3>
        
        {isLoading && customers.length === 0 ? (
          <p className="text-center py-4 text-gray-500">Loading customers...</p>
        ) : customers.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No customers found. Add one above.</p>
        ) : (
          <ul className="space-y-3">
            {customers.map((cust) => (
              <li
                key={cust.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <div>
                  <p className="font-medium text-gray-800">{cust.name}</p>
                  <p className="text-sm text-gray-600">{cust.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cust)}
                    className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 transition duration-150 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cust.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-150 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
