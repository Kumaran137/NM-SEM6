package com.customerorder.CustomerOrder.service;

import com.customerorder.CustomerOrder.model.Customer;
import com.customerorder.CustomerOrder.exception.ResourceNotFoundException;
import com.customerorder.CustomerOrder.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    public Customer addCustomer(Customer customer) {
        return repository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }

    public void deleteCustomer(Long id) {
        repository.deleteById(id);
    }
}
