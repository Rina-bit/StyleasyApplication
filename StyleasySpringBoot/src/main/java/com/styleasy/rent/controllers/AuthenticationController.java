package com.styleasy.rent.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.styleasy.rent.dto.*;
import com.styleasy.rent.models.AddressDetails;
import com.styleasy.rent.models.CustomerDetails;
import com.styleasy.rent.models.User;
import com.styleasy.rent.repositories.AddressDetailsRepository;
import com.styleasy.rent.repositories.CustomerDetailsRepository;
import com.styleasy.rent.repositories.UserRepository;
import com.styleasy.rent.util.JwtTokenUtil;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/Auth")
public class AuthenticationController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CustomerDetailsRepository customerDetailsRepository;
    @Autowired
    AddressDetailsRepository addressDetailsRepository;

    @PostMapping("/SignUp")
    public ResponseEntity<BasicDataResponseDTO> signUp(@RequestBody SignUpRequestDTO user) {
        BasicDataResponseDTO responseDTO = new BasicDataResponseDTO();
        responseDTO.setMessage("Registration Successfully");
        responseDTO.setIsSuccess(true);

        try {
            Optional<User> cUser = userRepository.findByUserName(user.getUserName());
            if (cUser.isPresent()) {
                return new ResponseEntity<>(new BasicDataResponseDTO(false, "User Already exists", null), HttpStatus.OK);
            }
            if (!user.getPassword().equals(user.getConfigPassword())) {
                return new ResponseEntity<>(new BasicDataResponseDTO(false, "Password and confirm password not matched", null), HttpStatus.OK);
            }
            if (user.getRole().equalsIgnoreCase("admin") && !user.getMasterPassword().equals("India@123")) {
                return new ResponseEntity<>(new BasicDataResponseDTO(false, "Wrong Master Password", null), HttpStatus.OK);
            }
            User newUser = new User();
            newUser.setUserName(user.getUserName());
            newUser.setEmailID(user.getEmailID());
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            newUser.setPassword(user.getPassword());
            newUser.setRole(user.getRole());
            newUser.setMobileNumber(user.getMobileNumber());
            userRepository.save(newUser);

        }catch (Exception ex){
            responseDTO.setIsSuccess(false);
            responseDTO.setMessage("Exception Message : "+ex.getMessage());
        }
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/SignIn")
    public ResponseEntity<SignInResponseDTO> signIn(@RequestBody SignInRequestDTO user) throws NoSuchAlgorithmException {

        SignInResponseDTO responseDTO = new SignInResponseDTO();
        responseDTO.setMessage("Sign In Successfully");
        responseDTO.setSuccess(true);

        try {
            Optional<User> cUser = userRepository
                    .findAll()
                    .stream()
                    .filter(u -> u.getUserName().equalsIgnoreCase(user.getUserName()) && u.getPassword().equals(user.getPassword()))
                    .findFirst();
            if (!cUser.isEmpty()) {
                final String token = jwtTokenUtil.generateToken(user);
                return new ResponseEntity<>(new SignInResponseDTO(true, "Sign In Successfully", token, cUser.get()), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new SignInResponseDTO(false, "Sign In Failed", null, null), HttpStatus.OK);
            }
        }catch (Exception ex){
            responseDTO.setSuccess(false);
            responseDTO.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(responseDTO);
    }

}
