package com.styleasy.rent.dto;


public class getAllFilterOrderRequestDTO {
    private String Type;
    private String Gender;
	public getAllFilterOrderRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public getAllFilterOrderRequestDTO(String type, String gender) {
		super();
		Type = type;
		Gender = gender;
	}
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public String getGender() {
		return Gender;
	}
	public void setGender(String gender) {
		Gender = gender;
	}
	@Override
	public String toString() {
		return "getAllFilterOrderRequestDTO [Type=" + Type + ", Gender=" + Gender + "]";
	}
    
    
    
    
}
