package com.styleasy.rent.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.styleasy.rent.dto.*;
import com.styleasy.rent.models.Feedback;
import com.styleasy.rent.repositories.FeedbackRepository;
import com.styleasy.rent.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/Feedback")
public class FeedbackController {
    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/GetFeedbacks")
    public ResponseEntity<BasicDataResponseDTO<List<Feedback>>> getFeedbacks() {
        BasicDataResponseDTO responseDTO = new BasicDataResponseDTO();
        responseDTO.setIsSuccess(true);
        responseDTO.setMessage("Fetch Feedback Successfully");
        try {
            List<Feedback> feedbacks = feedbackRepository.findAll();
            responseDTO.setData(feedbacks);
        }catch (Exception ex){
            responseDTO.setMessage("Exception Message : "+ex.getMessage());
            responseDTO.setIsSuccess(false);
        }

        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/AddFeedback")
    public ResponseEntity<BasicDataResponseDTO> AddFeedback( @RequestBody FeedbackRequestDTO feedback) {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Send Feedback Successfully");

        try {
            Feedback f = new Feedback();
            f.setFeedback(feedback.getFeedback());
            f.setUserName(feedback.getUsername());
            f.setInsertionDate(new Date());
            f.setProductName(feedback.getProductName());
            feedbackRepository.save(f);
        }catch (Exception ex){
            response.setMessage("Exception Message : "+ex.getMessage());
            response.setIsSuccess(false);
        }

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/DeleteFeedback")
    public ResponseEntity<BasicDataResponseDTO> deleteFeedback( @RequestParam Long feedbackId) {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Delete Feedback Successfully");
        try {
            feedbackRepository.deleteById(feedbackId);
        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }
        return ResponseEntity.ok().body(response);
    }

}
