package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.Rental;

public interface RentalRepository extends JpaRepository<Rental, Long> {
}
