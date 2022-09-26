package com.styleasy.rent.controllers;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.styleasy.rent.dto.*;
import com.styleasy.rent.models.MyOrder;
import com.styleasy.rent.models.Product;
import com.styleasy.rent.models.Rental;
import com.styleasy.rent.models.User;
import com.styleasy.rent.repositories.MyOrderRepository;
import com.styleasy.rent.repositories.ProductRepository;
import com.styleasy.rent.repositories.RentalRepository;
import com.styleasy.rent.repositories.UserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/Customer")
public class CustomerController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    MyOrderRepository myOrderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RentalRepository rentalRepository;

    @Operation( description = "Add new product / THis also used by seed supplier", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping(value = "/addproduct", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Async("asyncExecutor")
    public ResponseEntity<BasicDataResponseDTO> addProduct(@ModelAttribute AddProductRequestDTO request){
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setMessage("Add Product Successfully");
        response.setIsSuccess(true);

        try{

            Product product = new Product();
            product.setProductName(request.getProductName());
            product.setProductPrice(request.getProductPrice());
            product.setInsertionDate(new Date());
            product.setSize(request.getSize());
            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", "dzavgoc9w",
                    "api_key", "842688657531372",
                    "api_secret", "-djtDm1NRXVtjZ3L-HGaLfYnNBw",
                    "secure", true));
            Map uploadResult = cloudinary.uploader().upload(request.getProductImage().getBytes(), ObjectUtils.emptyMap());
             product.setImageUrl(uploadResult.get("url").toString());
             product.setType(request.getType());
             product.setGenderType(request.getGenderType());
             product.setFromDate(request.getFromDate());
             product.setToDate(request.getToDate());
             product.setQuentity(request.getQuentity());
             product.setUserID(request.getUserID());
             productRepository.save(product);

        }catch (Exception ex){
            response.setMessage("Exception Message : "+ex.getMessage());
            response.setIsSuccess(false);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping (value = "/getproduct")
    public ResponseEntity<BasicDataResponseDTO> getAllProduct()
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Get All Product Successfully");

        try{

            List<Product> product  =  productRepository.findAll();
            response.setData(product);

        }catch (Exception ex){
            response.setIsSuccess(true);
            response.setMessage("Get All Product Successfully");
        }

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/DeleteProduct")
    public ResponseEntity<BasicDataResponseDTO> deleteProduct( @RequestParam Long ProductID) {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Cancle Product Successfully");
        try {
            productRepository.deleteById(ProductID);
        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }
        return ResponseEntity.ok().body(response);
    }


    @PostMapping(value = "/addOrder")
    public ResponseEntity<BasicDataResponseDTO> AddOrder(@RequestBody AddOrderRequestDTO request)
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Add Order Successfully");

        try{

            MyOrder myOrder = new MyOrder();
            myOrder.setInsertionDate(new Date());
            myOrder.setUserID(request.getUserID());
            myOrder.setProductID(request.getProductID());
            myOrderRepository.save(myOrder);

        }catch (Exception ex){
            response.setIsSuccess(true);
            response.setMessage("Get All Product Successfully");
        }

        return ResponseEntity.ok().body(response);
    }

    @GetMapping (value = "/getOrder")
    public ResponseEntity<BasicDataResponseDTO<GetAllOrderResponseDTO>> getAllOrder(@RequestParam Long UserID)
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        List<GetAllOrderResponseDTO> data = new ArrayList<>();
        response.setIsSuccess(true);
        response.setMessage("Get All Order Successfully");

        try{
            List<Rental> rental = null;
            if(UserID==-1)
            {
                rental = rentalRepository.findAll();
            }else {
                rental = rentalRepository.findAll().stream().filter(X -> X.getUserID().equals(UserID)).collect(Collectors.toList());
            }
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String[] CurrentDate = (formatter.format(date)).split("-");
            Date TodayDate = new Date(Integer.parseInt(CurrentDate[0]), Integer.parseInt(CurrentDate[1]), Integer.parseInt(CurrentDate[2]));
            long TodayDateMs = TodayDate.getTime();
            rental.forEach(
                    X->{
                        GetAllOrderResponseDTO getData =  new GetAllOrderResponseDTO();
                        //RentalID, UserID, ProductName, CustomerName, Address, MobileNumber, Price, Size, FromDate, ToDate
                        getData.setRentalID(X.getRentalID());
                        getData.setUserID(X.getUserID());
                        Optional<Product> product = productRepository.findAll().stream().filter(X1->X1.getProductID().equals(X.getProductID())).findFirst();
                        getData.setProductName(product.get().getProductName());
                        getData.setCustomerName(X.getCustomerName());
                        getData.setAddress(X.getAddress());
                        getData.setMobileNumber(X.getMobileNumber());
                        getData.setPrice(X.getPrice());
                        getData.setSize(X.getSize());
                        getData.setFromDate(X.getFromDate());
                        String[] EndDate = X.getFromDate().split("-");
                        String[] StartDate = X.getToDate().split("-");
                        Date dateBefore = new Date(Integer.parseInt(StartDate[0]), Integer.parseInt(StartDate[1]), Integer.parseInt(StartDate[2]));
                        Date dateAfter = new Date(Integer.parseInt(EndDate[0]), Integer.parseInt(EndDate[1]), Integer.parseInt(EndDate[2]));
                        long dateBeforeInMs = dateBefore.getTime();
                        long dateAfterInMs = dateAfter.getTime();
                        long timeDiff = Math.abs(dateAfterInMs - dateBeforeInMs);
                        long daysDiff = TimeUnit.DAYS.convert(timeDiff, TimeUnit.MILLISECONDS);
                        getData.setTotalDays(daysDiff);
                        getData.setToDate(X.getToDate());
                        timeDiff = (TodayDateMs - dateAfterInMs);
                        daysDiff = TimeUnit.DAYS.convert(timeDiff, TimeUnit.MILLISECONDS);
                        System.out.println("Paynality Days : "+daysDiff);
                        getData.setPenalityDays(daysDiff>0?daysDiff:0);
                        getData.setPenality(daysDiff>0?daysDiff*10:0);
                        data.add(getData);
                    }
            );
            response.setData(data);

        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(response);
    }


    @PostMapping (value = "/getCustomerOrder")
    public ResponseEntity<BasicDataResponseDTO<GetAllOrderResponseDTO>> getCustomerOrder(@RequestBody getCustomerOrderRequestDTO request)
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        List<GetRentalResponseDTO> getData = new ArrayList<>();
        List<GetAllOrderResponseDTO> data = new ArrayList<>();
        response.setIsSuccess(true);
        response.setMessage("Get All Order Successfully");

        try{

            List<Rental> rental  =  rentalRepository.findAll().stream().filter(X->X.getUserID()==request.getUserID()).collect(Collectors.toList());
            rental.forEach(X->{
                GetRentalResponseDTO get = new GetRentalResponseDTO();
                get.setRentalID(X.getRentalID());
                get.setCustomerName(X.getCustomerName());
                get.setPrice(X.getPrice());
                get.setToDate(X.getToDate());
                get.setFromDate(X.getFromDate());
                Optional<Product> product = productRepository.findAll().stream().filter(O->O.getProductID()==X.getProductID()).findFirst();
                get.setProductName(product.get().getProductName());
                getData.add(get);
            });
            response.setData(rental);

        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(response);
    }

    @PostMapping (value = "/getAllFilterOrder")
    public ResponseEntity<BasicDataResponseDTO> getAllFilterOrder(@RequestBody getAllFilterOrderRequestDTO request)
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        List<Product> data = new ArrayList<>();
        response.setIsSuccess(true);
        response.setMessage("Get All Customer Product Successfully");

        try{

            List<Product> products  =  productRepository
                    .findAll().stream()
                    .filter(X->X.getGenderType().equals(request.getGender())
                            && X.getType().equals(request.getType())).collect(Collectors.toList());

            response.setData(products);

        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/DeleteOrder")
    public ResponseEntity<BasicDataResponseDTO> deleteOrder( @RequestParam Long orderId) {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Cancle Order Successfully");
        try {
            rentalRepository.deleteById(orderId);
        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(value = "/AddRentalProduct")
    public ResponseEntity<BasicDataResponseDTO> AddRentalProduct(@RequestBody AddRentalProductRequestDTO request)
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Add My Order Successfully");

        try{

            Rental rental = new Rental();
            rental.setSize(request.getSize());
            rental.setCustomerName(request.getCustomerName());
            rental.setPrice(request.getPrice());
            rental.setFromDate(request.getFromDate());
            rental.setAddress(request.getAddress());
            rental.setToDate(request.getToDate());
            rental.setMobileNumber(request.getMobileNumber());
            rental.setUserID(request.getUserID());
            rental.setProductID(request.getProductID());
            rentalRepository.save(rental);

        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(response);
    }

    @GetMapping (value = "/GetCustomerList")
    public ResponseEntity<BasicDataResponseDTO<List<User>>> GetCustomerList()
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Get All Customer List Successfully");

        try{

            List<User> user  =  userRepository.findAll()
                    .stream().filter(X->X.getRole().equals("CUSTOMER"))
                    .collect(Collectors.toList());
            response.setData(user);

        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(response);
    }


    @GetMapping (value = "/PenalityOrderList")
    public ResponseEntity<BasicDataResponseDTO> PenalityOrderList(@RequestParam Long UserID)
    {
        BasicDataResponseDTO response = new BasicDataResponseDTO();
        PenalityOrderListResponseDTO responseDTO = new PenalityOrderListResponseDTO();
        response.setIsSuccess(true);
        response.setMessage("Get All Penality Order List Successfully");

        try{

            var data  = myOrderRepository.findAll()
                    .stream().filter(X->X.getUserID().equals(UserID)).collect(Collectors.toList());
            response.setData(data);

        }catch (Exception ex){
            response.setIsSuccess(false);
            response.setMessage("Exception Message : "+ex.getMessage());
        }

        return ResponseEntity.ok().body(response);
    }


}
