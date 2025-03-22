package com.customerorder.CustomerOrder.repository;
import com.customerorder.CustomerOrder.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository <Customer, Long> {
}
