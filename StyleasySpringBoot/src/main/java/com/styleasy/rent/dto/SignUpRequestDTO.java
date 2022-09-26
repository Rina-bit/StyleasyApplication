package com.styleasy.rent.dto;

public class SignUpRequestDTO {
    private String userName;
    private String FirstName;
    private String LastName;
    private String EmailID;
    private String password;
    private String MobileNumber;
    private String configPassword;
    private String masterPassword;
    private String role;
	public SignUpRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SignUpRequestDTO(String userName, String firstName, String lastName, String emailID, String password,
			String mobileNumber, String configPassword, String masterPassword, String role) {
		super();
		this.userName = userName;
		FirstName = firstName;
		LastName = lastName;
		EmailID = emailID;
		this.password = password;
		MobileNumber = mobileNumber;
		this.configPassword = configPassword;
		this.masterPassword = masterPassword;
		this.role = role;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getFirstName() {
		return FirstName;
	}
	public void setFirstName(String firstName) {
		FirstName = firstName;
	}
	public String getLastName() {
		return LastName;
	}
	public void setLastName(String lastName) {
		LastName = lastName;
	}
	public String getEmailID() {
		return EmailID;
	}
	public void setEmailID(String emailID) {
		EmailID = emailID;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileNumber() {
		return MobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		MobileNumber = mobileNumber;
	}
	public String getConfigPassword() {
		return configPassword;
	}
	public void setConfigPassword(String configPassword) {
		this.configPassword = configPassword;
	}
	public String getMasterPassword() {
		return masterPassword;
	}
	public void setMasterPassword(String masterPassword) {
		this.masterPassword = masterPassword;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "SignUpRequestDTO [userName=" + userName + ", FirstName=" + FirstName + ", LastName=" + LastName
				+ ", EmailID=" + EmailID + ", password=" + password + ", MobileNumber=" + MobileNumber
				+ ", configPassword=" + configPassword + ", masterPassword=" + masterPassword + ", role=" + role + "]";
	}
    
    
    
}
