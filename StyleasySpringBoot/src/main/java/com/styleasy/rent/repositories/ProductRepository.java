package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
