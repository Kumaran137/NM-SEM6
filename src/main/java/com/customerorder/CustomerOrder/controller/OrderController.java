package com.customerorder.CustomerOrder.controller;

import com.customerorder.CustomerOrder.model.Order;
import com.customerorder.CustomerOrder.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Order API", description = "Operations related to orders")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;



    @PostMapping("/bulk")
    public List<Order> addOrders(@RequestBody List<Order> orders) {
        System.out.println("Received orders: " + orders);
        return service.addOrders(orders);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return service.getOrderById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        service.deleteOrder(id);
    }
}
