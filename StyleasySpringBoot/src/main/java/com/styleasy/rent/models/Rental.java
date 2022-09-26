package com.styleasy.rent.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long RentalID;
    private Long UserID;
    private Long ProductID;
    private String CustomerName;
    private String Address;
    private String MobileNumber;
    private String Price;
    private String Size;
    private String FromDate;
    private String ToDate;
	public Rental() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Rental(Long rentalID, Long userID, Long productID, String customerName, String address, String mobileNumber,
			String price, String size, String fromDate, String toDate) {
		super();
		RentalID = rentalID;
		UserID = userID;
		ProductID = productID;
		CustomerName = customerName;
		Address = address;
		MobileNumber = mobileNumber;
		Price = price;
		Size = size;
		FromDate = fromDate;
		ToDate = toDate;
	}
	public Long getRentalID() {
		return RentalID;
	}
	public void setRentalID(Long rentalID) {
		RentalID = rentalID;
	}
	public Long getUserID() {
		return UserID;
	}
	public void setUserID(Long userID) {
		UserID = userID;
	}
	public Long getProductID() {
		return ProductID;
	}
	public void setProductID(Long productID) {
		ProductID = productID;
	}
	public String getCustomerName() {
		return CustomerName;
	}
	public void setCustomerName(String customerName) {
		CustomerName = customerName;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getMobileNumber() {
		return MobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		MobileNumber = mobileNumber;
	}
	public String getPrice() {
		return Price;
	}
	public void setPrice(String price) {
		Price = price;
	}
	public String getSize() {
		return Size;
	}
	public void setSize(String size) {
		Size = size;
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
	@Override
	public String toString() {
		return "Rental [RentalID=" + RentalID + ", UserID=" + UserID + ", ProductID=" + ProductID + ", CustomerName="
				+ CustomerName + ", Address=" + Address + ", MobileNumber=" + MobileNumber + ", Price=" + Price
				+ ", Size=" + Size + ", FromDate=" + FromDate + ", ToDate=" + ToDate + "]";
	}
    
    
    
}
