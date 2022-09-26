package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.AddressDetails;

import java.util.Optional;

public interface AddressDetailsRepository extends JpaRepository<AddressDetails, Long> {
    Optional<AddressDetails> getAddressDetailsByUserID(Long userId);
    AddressDetails getSingleAddressDetailsByUserID(Long userId);
}
