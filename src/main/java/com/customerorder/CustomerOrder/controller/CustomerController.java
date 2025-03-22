package com.customerorder.CustomerOrder.controller;

import com.customerorder.CustomerOrder.model.Customer;
import com.customerorder.CustomerOrder.service.CustomerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Customer API", description = "Operations related to customers")
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return service.addCustomer(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return service.getCustomerById(id);
    }

    @DeleteMapping("/{id}") // ✅ Corrected the mapping from "/id" to "/{id}"
    public void deleteCustomer(@PathVariable Long id) { // ✅ Added @PathVariable
        service.deleteCustomer(id);
    }
}
