package com.styleasy.rent.dto;

import java.util.Date;

public class GetAllOrderResponseDTO {
    //RentalID, UserID, ProductName, CustomerName, Address, MobileNumber, Price, Size, FromDate, ToDate
    private Long RentalID;
    private Long UserID;
    private String ProductName;
    private String CustomerName;
    private String Address;
    private String MobileNumber;
    private String Price;
    private String Size;
    private String FromDate;
    private String ToDate;
    private Long TotalDays;
    private Long PenalityDays;
    private Long Penality;
	public GetAllOrderResponseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GetAllOrderResponseDTO(Long rentalID, Long userID, String productName, String customerName, String address,
			String mobileNumber, String price, String size, String fromDate, String toDate, Long totalDays,
			Long penalityDays, Long penality) {
		super();
		RentalID = rentalID;
		UserID = userID;
		ProductName = productName;
		CustomerName = customerName;
		Address = address;
		MobileNumber = mobileNumber;
		Price = price;
		Size = size;
		FromDate = fromDate;
		ToDate = toDate;
		TotalDays = totalDays;
		PenalityDays = penalityDays;
		Penality = penality;
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
	public String getProductName() {
		return ProductName;
	}
	public void setProductName(String productName) {
		ProductName = productName;
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
	public Long getTotalDays() {
		return TotalDays;
	}
	public void setTotalDays(Long totalDays) {
		TotalDays = totalDays;
	}
	public Long getPenalityDays() {
		return PenalityDays;
	}
	public void setPenalityDays(Long penalityDays) {
		PenalityDays = penalityDays;
	}
	public Long getPenality() {
		return Penality;
	}
	public void setPenality(Long penality) {
		Penality = penality;
	}
	@Override
	public String toString() {
		return "GetAllOrderResponseDTO [RentalID=" + RentalID + ", UserID=" + UserID + ", ProductName=" + ProductName
				+ ", CustomerName=" + CustomerName + ", Address=" + Address + ", MobileNumber=" + MobileNumber
				+ ", Price=" + Price + ", Size=" + Size + ", FromDate=" + FromDate + ", ToDate=" + ToDate
				+ ", TotalDays=" + TotalDays + ", PenalityDays=" + PenalityDays + ", Penality=" + Penality + "]";
	}
    
    
    
    
}
