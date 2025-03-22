package com.customerorder.CustomerOrder.service;
import com.customerorder.CustomerOrder.model.Order;

import com.customerorder.CustomerOrder.exception.ResourceNotFoundException;

import com.customerorder.CustomerOrder.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    public Order addOrder(Order order) {
        return repository.save(order);
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public Order getOrderById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }
    public void deleteOrder(Long id){
        repository.deleteById(id);
    }
}
