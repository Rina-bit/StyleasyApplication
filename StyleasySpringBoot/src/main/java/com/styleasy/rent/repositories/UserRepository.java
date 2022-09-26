package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);
    //User findByUserID(Long userId);
}
