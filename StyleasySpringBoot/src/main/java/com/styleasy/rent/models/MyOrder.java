package com.styleasy.rent.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class MyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long OrderID;
    private Date insertionDate=new Date();
    private Long UserID;
    private Long ProductID;
	public MyOrder() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MyOrder(Long orderID, Date insertionDate, Long userID, Long productID) {
		super();
		OrderID = orderID;
		this.insertionDate = insertionDate;
		UserID = userID;
		ProductID = productID;
	}
	public Long getOrderID() {
		return OrderID;
	}
	public void setOrderID(Long orderID) {
		OrderID = orderID;
	}
	public Date getInsertionDate() {
		return insertionDate;
	}
	public void setInsertionDate(Date insertionDate) {
		this.insertionDate = insertionDate;
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
		return "MyOrder [OrderID=" + OrderID + ", insertionDate=" + insertionDate + ", UserID=" + UserID
				+ ", ProductID=" + ProductID + "]";
	}
    
    
    
}
