package com.styleasy.rent.dto;



public class AddOrderRequestDTO {
    private Long UserID;
    private Long ProductID;
	public AddOrderRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AddOrderRequestDTO(Long userID, Long productID) {
		super();
		UserID = userID;
		ProductID = productID;
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
	@Override
	public String toString() {
		return "AddOrderRequestDTO [UserID=" + UserID + ", ProductID=" + ProductID + "]";
	}
    
    
}
