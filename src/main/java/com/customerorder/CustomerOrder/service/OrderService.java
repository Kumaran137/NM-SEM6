package com.customerorder.CustomerOrder.service;
import com.customerorder.CustomerOrder.model.Order;

import com.customerorder.CustomerOrder.exception.ResourceNotFoundException;

import com.customerorder.CustomerOrder.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;


    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public Order getOrderById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    @Transactional  // Ensures proper transaction management
    public Order addOrder(Order order) {
        Order savedOrder = repository.save(order);  // ✅ Save and return
        System.out.println("Saved order with ID: " + savedOrder.getId());  // ✅ Debugging
        return savedOrder;
    }

    @Transactional
    public List<Order> addOrders(List<Order> orders) {
        List<Order> savedOrders = repository.saveAll(orders);  // ✅ Save all orders
        savedOrders.forEach(order -> System.out.println("Saved order ID: " + order.getId()));  // ✅ Debugging
        return savedOrders;
    }

    public void deleteOrder(Long id){
        repository.deleteById(id);
    }
}
