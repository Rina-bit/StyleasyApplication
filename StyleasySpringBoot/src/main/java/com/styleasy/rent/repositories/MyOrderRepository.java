package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.MyOrder;

public interface MyOrderRepository extends JpaRepository<MyOrder, Long> {
}
