package com.customerorder.CustomerOrder.repository;


import com.customerorder.CustomerOrder.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}

