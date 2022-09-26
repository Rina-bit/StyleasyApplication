package com.styleasy.rent.dto;

public class BasicDataResponseDTO<T> {
    private Boolean IsSuccess;
    private String Message;
    private T data;
	public BasicDataResponseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BasicDataResponseDTO(Boolean isSuccess, String message, T data) {
		super();
		IsSuccess = isSuccess;
		Message = message;
		this.data = data;
	}
	public Boolean getIsSuccess() {
		return IsSuccess;
	}
	public void setIsSuccess(Boolean isSuccess) {
		IsSuccess = isSuccess;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	
	@Override
	public String toString() {
		return "BasicDataResponseDTO [IsSuccess=" + IsSuccess + ", Message=" + Message + ", data=" + data + "]";
	}
    
    
    
    
}
