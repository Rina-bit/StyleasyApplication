package com.styleasy.rent.dto;

import com.styleasy.rent.models.User;

public class SignInResponseDTO {
    private boolean isSuccess;
    private String Message;
    private String Token;
    private User data;
	public SignInResponseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SignInResponseDTO(boolean isSuccess, String message, String token, User data) {
		super();
		this.isSuccess = isSuccess;
		Message = message;
		Token = token;
		this.data = data;
	}
	public boolean isSuccess() {
		return isSuccess;
	}
	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
	public String getToken() {
		return Token;
	}
	public void setToken(String token) {
		Token = token;
	}
	public User getData() {
		return data;
	}
	public void setData(User data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "SignInResponseDTO [isSuccess=" + isSuccess + ", Message=" + Message + ", Token=" + Token + ", data="
				+ data + "]";
	}
    
    
}
