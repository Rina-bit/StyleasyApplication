import AxiosServices from "./AxiosServices";
let baseURL = "http://localhost:8080/";

const axiosServices = new AxiosServices();

const headers = {
  headers: {
    "content-type": "application/json",
    "cache-control": "no-cache",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const UserId = localStorage.getItem("UserId");

export default class AuthServices {
  SignUp(data) {
    return axiosServices.post(baseURL + "api/Auth/SignUp", data, false);
  }

  SignIn(data) {
    return axiosServices.post(baseURL + "api/Auth/SignIn", data, false);
  }

  AddFeedback(data) {
    return axiosServices.post(
      baseURL + "api/Feedback/AddFeedback",
      data,
      false
    );
  }

  GetFeedback(data) {
    return axiosServices.Get(
      baseURL + "api/Feedback/GetFeedbacks",
      data,
      false
    );
  }

  DeleteFeedback(data) {
    return axiosServices.Delete(
      baseURL + `api/Feedback/DeleteFeedback?feedbackId=${data}`,
      false
    );
  }

  getAllFilterOrder(data) {
    return axiosServices.post(
      baseURL + `api/Customer/getAllFilterOrder`,
      data,
      true,
      headers
    );
  }

  AddProduct(data) {
    debugger;
    return axiosServices.post(
      baseURL + `api/Customer/addproduct`,
      data,
      true,
      headers
    );
  }
  GetProduct() {
    return axiosServices.Get(
      baseURL + `api/Customer/getproduct`,
      true,
      headers
    );
  }
  AddOrder(data) {
    return axiosServices.post(
      baseURL + `api/Customer/addOrder`,
      data,
      true,
      headers
    );
  }
  GetOrder(data) {
    return axiosServices.Get(
      baseURL + `api/Customer/getOrder?UserID=${data}`,
      true,
      headers
    );
  }

  DeleteOrder(data) {
    return axiosServices.Delete(
      baseURL + `api/Customer/DeleteOrder?orderId=${data}`,
      true,
      headers
    );
  }

  DeleteProduct(data) {
    return axiosServices.Delete(
      baseURL + `api/Customer/DeleteProduct?ProductID=${data}`,
      true,
      headers
    );
  }

  AddRentalProduct(data) {
    return axiosServices.post(
      baseURL + `api/Customer/AddRentalProduct`,
      data,
      true,
      headers
    );
  }

  GetCustomerList() {
    return axiosServices.Get(
      baseURL + `api/Customer/GetCustomerList`,
      true,
      headers
    );
  }
  // SaveAddressAdmin(data) {
  //   return axiosServices.post(baseURL+ `api/address/save`, data, true,headers);
  // }
  // DeliveredStatus(OrderId) {
  //   return axiosServices.Get(baseURL + `api/order/delivered/${OrderId}`,  true,headers);
  // }
  // DeliveryBoy(page,size) {
  //   return axiosServices.Get(baseURL  + `api/user/delivery-boys?page=${page}&size=${size}`,  true,headers);
  // }
  // CustomerList(page,size) {
  //   return axiosServices.Get(baseURL  + `api/user/customers?page=${page}&size=${size}`, true,headers);
  // }
  // ActiveUserCustomerList(page,size) {
  //   return axiosServices.Get(baseURL + `api/user/active-users?page=${page}&size=${size}` , true,headers);
  // }
  // GETALLTiffins(data) {
  //   return axiosServices.Get(baseURL + `api/tiffin/all` , true,headers);
  // }
  // TiffinIUpdateData(data,tiifinid) {

  //   return axiosServices.put(baseURL + `api/tiffin/save/${tiifinid}`, data, true,headers);
  // }
  // DeleteTiffin(deleteid) {
  //   return axiosServices.Delete (baseURL + `api/tiffin/delete/${deleteid}`, true,headers);
  // }

  // TiffinInsertData(data) {
  //   return axiosServices.post(baseURL  + `api/tiffin/save`, data, true,headers);
  // }
  // CurrentUserList(page,size) {
  //   return axiosServices.Get(baseURL  + `api/order/all/current?page=${page}&size=${size}`,true,headers);
  // }
  // AssignPendingstatus(OrderId,deliveryboyid) {
  //   return axiosServices.Get(baseURL + `api/order/assign/${OrderId}/${deliveryboyid}`, true,headers);
  // }
  // USerEditProfile(data) {
  //   return axiosServices.put(baseURL + `api/user/update/${UserId}`, data, true,headers);
  // }
  // UserOrderData(Pageno,size) {
  //   return axiosServices.Get(baseURL + `api/order/all/user/${UserId}?page=${Pageno}&size=${size}`, true,headers);
  // }
}
