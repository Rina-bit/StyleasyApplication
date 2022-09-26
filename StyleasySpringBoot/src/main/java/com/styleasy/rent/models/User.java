package com.styleasy.rent.models;



import javax.persistence.*;
import java.util.Date;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String userName;
    private String FirstName;
    private String LastName;
    private String EmailID;
    private String password;
    private  String MobileNumber;
    @Column(columnDefinition = "VARCHAR(10) NOT NULL CHECK (Role IN('customer', 'admin'))")
    private String role;
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate=new Date();
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive=true;
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(Long userId, String userName, String firstName, String lastName, String emailID, String password,
			String mobileNumber, String role, Date insertionDate, Boolean isActive) {
		super();
		this.userId = userId;
		this.userName = userName;
		FirstName = firstName;
		LastName = lastName;
		EmailID = emailID;
		this.password = password;
		MobileNumber = mobileNumber;
		this.role = role;
		this.insertionDate = insertionDate;
		this.isActive = isActive;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
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
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Date getInsertionDate() {
		return insertionDate;
	}
	public void setInsertionDate(Date insertionDate) {
		this.insertionDate = insertionDate;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", FirstName=" + FirstName + ", LastName="
				+ LastName + ", EmailID=" + EmailID + ", password=" + password + ", MobileNumber=" + MobileNumber
				+ ", role=" + role + ", insertionDate=" + insertionDate + ", isActive=" + isActive + "]";
	}
    
    
    
    
}
