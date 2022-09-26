package com.styleasy.rent.dto;

public class SignInRequestDTO {
    private String userName;
    private String password;
    private String role;
	public SignInRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SignInRequestDTO(String userName, String password, String role) {
		super();
		this.userName = userName;
		this.password = password;
		this.role = role;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "SignInRequestDTO [userName=" + userName + ", password=" + password + ", role=" + role + "]";
	}
    
    
}
