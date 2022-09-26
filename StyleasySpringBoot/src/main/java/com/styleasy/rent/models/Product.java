package com.styleasy.rent.models;


import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Date;

@Entity

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ProductID;
    private Date insertionDate=new Date();
    private Long UserID;
    private String ProductName;
    private String ProductPrice;
    private String Quentity;
    private String Size;
    private String imageUrl;
    private String FromDate;
    private String ToDate;
    private String GenderType; // Male, Female, Kids
    private String Type; // Traditional, Western
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive=true;
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Product(Long productID, Date insertionDate, Long userID, String productName, String productPrice,
			String quentity, String size, String imageUrl, String fromDate, String toDate, String genderType,
			String type, Boolean isActive) {
		super();
		ProductID = productID;
		this.insertionDate = insertionDate;
		UserID = userID;
		ProductName = productName;
		ProductPrice = productPrice;
		Quentity = quentity;
		Size = size;
		this.imageUrl = imageUrl;
		FromDate = fromDate;
		ToDate = toDate;
		GenderType = genderType;
		Type = type;
		this.isActive = isActive;
	}
	public Long getProductID() {
		return ProductID;
	}
	public void setProductID(Long productID) {
		ProductID = productID;
	}
	public Date getInsertionDate() {
		return insertionDate;
	}
	public void setInsertionDate(Date insertionDate) {
		this.insertionDate = insertionDate;
	}
	public Long getUserID() {
		return UserID;
	}
	public void setUserID(Long userID) {
		UserID = userID;
	}
	public String getProductName() {
		return ProductName;
	}
	public void setProductName(String productName) {
		ProductName = productName;
	}
	public String getProductPrice() {
		return ProductPrice;
	}
	public void setProductPrice(String productPrice) {
		ProductPrice = productPrice;
	}
	public String getQuentity() {
		return Quentity;
	}
	public void setQuentity(String quentity) {
		Quentity = quentity;
	}
	public String getSize() {
		return Size;
	}
	public void setSize(String size) {
		Size = size;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getFromDate() {
		return FromDate;
	}
	public void setFromDate(String fromDate) {
		FromDate = fromDate;
	}
	public String getToDate() {
		return ToDate;
	}
	public void setToDate(String toDate) {
		ToDate = toDate;
	}
	public String getGenderType() {
		return GenderType;
	}
	public void setGenderType(String genderType) {
		GenderType = genderType;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	@Override
	public String toString() {
		return "Product [ProductID=" + ProductID + ", insertionDate=" + insertionDate + ", UserID=" + UserID
				+ ", ProductName=" + ProductName + ", ProductPrice=" + ProductPrice + ", Quentity=" + Quentity
				+ ", Size=" + Size + ", imageUrl=" + imageUrl + ", FromDate=" + FromDate + ", ToDate=" + ToDate
				+ ", GenderType=" + GenderType + ", Type=" + Type + ", isActive=" + isActive + "]";
	}
    
    
    
    
}
