package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.CustomerDetails;

import java.util.Optional;

public interface CustomerDetailsRepository extends JpaRepository<CustomerDetails, Long> {
    Optional<CustomerDetails> getCustomerDetailsByUserID(Long userId);

    CustomerDetails getSingleCustomerDetailsByUserID(Long userId);
}
