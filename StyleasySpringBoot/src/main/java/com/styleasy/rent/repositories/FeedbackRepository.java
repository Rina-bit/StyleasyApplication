package com.styleasy.rent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.styleasy.rent.models.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
