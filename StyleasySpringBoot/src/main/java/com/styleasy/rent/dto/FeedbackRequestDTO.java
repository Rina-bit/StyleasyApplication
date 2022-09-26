package com.styleasy.rent.dto;

public class FeedbackRequestDTO {
    private String username;
    private String ProductName;
    private String feedback;
	public FeedbackRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public FeedbackRequestDTO(String username, String productName, String feedback) {
		super();
		this.username = username;
		ProductName = productName;
		this.feedback = feedback;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getProductName() {
		return ProductName;
	}
	public void setProductName(String productName) {
		ProductName = productName;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	@Override
	public String toString() {
		return "FeedbackRequestDTO [username=" + username + ", ProductName=" + ProductName + ", feedback=" + feedback
				+ "]";
	}
    
    
}
