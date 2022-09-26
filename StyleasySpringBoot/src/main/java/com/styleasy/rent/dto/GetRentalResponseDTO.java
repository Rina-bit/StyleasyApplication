package com.styleasy.rent.dto;


public class GetRentalResponseDTO {
    private Long RentalID;
    private String ProductName;
    private String CustomerName;
    private  String Price;
    private String FromDate;
    private String ToDate;
	public GetRentalResponseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public GetRentalResponseDTO(Long rentalID, String productName, String customerName, String price, String fromDate,
			String toDate) {
		super();
		RentalID = rentalID;
		ProductName = productName;
		CustomerName = customerName;
		Price = price;
		FromDate = fromDate;
		ToDate = toDate;
	}
	public Long getRentalID() {
		return RentalID;
	}
	public void setRentalID(Long rentalID) {
		RentalID = rentalID;
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
	public String getPrice() {
		return Price;
	}
	public void setPrice(String price) {
		Price = price;
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
		return "GetRentalResponseDTO [RentalID=" + RentalID + ", ProductName=" + ProductName + ", CustomerName="
				+ CustomerName + ", Price=" + Price + ", FromDate=" + FromDate + ", ToDate=" + ToDate + "]";
	}
    
    
}
