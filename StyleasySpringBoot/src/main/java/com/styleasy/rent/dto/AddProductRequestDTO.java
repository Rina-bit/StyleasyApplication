package com.styleasy.rent.dto;


import org.springframework.web.multipart.MultipartFile;


public class AddProductRequestDTO {
    private Long UserID;
    private String ProductName;
    private String ProductPrice;
    private String Quentity;
    private String Size;
    private MultipartFile productImage;
    private String FromDate;
    private String ToDate;
    private String GenderType; // Male, Female, Kids
    private String Type; // Traditional, Western
	public AddProductRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AddProductRequestDTO(Long userID, String productName, String productPrice, String quentity, String size,
			MultipartFile productImage, String fromDate, String toDate, String genderType, String type) {
		super();
		UserID = userID;
		ProductName = productName;
		ProductPrice = productPrice;
		Quentity = quentity;
		Size = size;
		this.productImage = productImage;
		FromDate = fromDate;
		ToDate = toDate;
		GenderType = genderType;
		Type = type;
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
	public MultipartFile getProductImage() {
		return productImage;
	}
	public void setProductImage(MultipartFile productImage) {
		this.productImage = productImage;
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
	@Override
	public String toString() {
		return "AddProductRequestDTO [UserID=" + UserID + ", ProductName=" + ProductName + ", ProductPrice="
				+ ProductPrice + ", Quentity=" + Quentity + ", Size=" + Size + ", productImage=" + productImage
				+ ", FromDate=" + FromDate + ", ToDate=" + ToDate + ", GenderType=" + GenderType + ", Type=" + Type
				+ "]";
	}
    
    
    
}
