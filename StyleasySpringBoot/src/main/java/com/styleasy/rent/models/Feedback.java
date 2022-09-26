package com.styleasy.rent.models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long feedbackId;
    @Column(insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionDate=new Date();
    private String UserName;
    private String ProductName;
    private String feedback;
	public Feedback() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Feedback(Long feedbackId, Date insertionDate, String userName, String productName, String feedback) {
		super();
		this.feedbackId = feedbackId;
		this.insertionDate = insertionDate;
		UserName = userName;
		ProductName = productName;
		this.feedback = feedback;
	}
	public Long getFeedbackId() {
		return feedbackId;
	}
	public void setFeedbackId(Long feedbackId) {
		this.feedbackId = feedbackId;
	}
	public Date getInsertionDate() {
		return insertionDate;
	}
	public void setInsertionDate(Date insertionDate) {
		this.insertionDate = insertionDate;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
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
		return "Feedback [feedbackId=" + feedbackId + ", insertionDate=" + insertionDate + ", UserName=" + UserName
				+ ", ProductName=" + ProductName + ", feedback=" + feedback + "]";
	}
    
    
    
}
