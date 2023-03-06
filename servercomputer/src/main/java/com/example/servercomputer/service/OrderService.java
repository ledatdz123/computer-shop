package com.example.servercomputer.service;

import com.example.servercomputer.dto.OrderDTO;
import com.example.servercomputer.exception.ResourceNotFoundException;
import com.example.servercomputer.exception.UpdateDataFail;
import com.example.servercomputer.response.MessageResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public List<OrderDTO> retrieveOrders();

    public Optional<OrderDTO> getOrder(Long orderId) throws ResourceNotFoundException;

    public OrderDTO saveOrder(OrderDTO order) throws ResourceNotFoundException;

    public Boolean deleteOrder(Long orderId) throws ResourceNotFoundException;

    public OrderDTO updateOrder(Long orderId,OrderDTO order) throws ResourceNotFoundException;

    public List<OrderDTO> findOrderByUser(Long userId) throws ResourceNotFoundException;
    public OrderDTO updateOrderStatus(Long orderId,OrderDTO order) throws ResourceNotFoundException;
    public OrderDTO updateStatusOrder(Long orderId) throws ResourceNotFoundException;
    public ResponseEntity<MessageResponse> cancelStatusOrder(Long orderId) throws ResourceNotFoundException, UpdateDataFail;

}

