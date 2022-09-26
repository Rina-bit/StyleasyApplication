package com.styleasy.rent.dto;



public class getCustomerOrderRequestDTO {
    public Long UserID;

	public getCustomerOrderRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public getCustomerOrderRequestDTO(Long userID) {
		super();
		UserID = userID;
	}
	

	public Long getUserID() {
		return UserID;
	}

	public void setUserID(Long userID) {
		UserID = userID;
	}

	@Override
	public String toString() {
		return "getCustomerOrderRequestDTO [UserID=" + UserID + "]";
	}
    
    
}
