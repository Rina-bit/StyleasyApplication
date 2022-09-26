import React, { Component } from "react";

import "./CustomerDashboard.css";
import "../Product/GetUserMenus.css";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import AuthServices from "../../configurations/AuthServices";
import Pagination from "@material-ui/lab/Pagination";

const authServices = new AuthServices();
const minDate = new Date(Date.now());

export default class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: localStorage.getItem("CustomerId"),
      
      CustomerAddress: "",
      CustomerPhoneNo: "",
      ProductID: 0,
      CustomerPrice: "",
      
      Category: [],
      MyOrderList: [],
      OwnCloth: [],
      ItemTypeRadioValue: "Pending",
      File: new FormData(),
      FileName: "",
      
      ProductName: "",
      FeedBack: "",
      RatingValue: 1,
      OpenFeedback: false,
      
      Message: "",
      
      NumberOfRecordPerPage: 6,
      
      PageNumber: 1,
      CategoryPageNumber: 1,
      MyOrderPageNumber: 1,
      OwnClothPageNumber: 1,
      
      TotalPages: 0,
      TotalRecords: 0,

      Open: false,
      OpenLoader: false,
      OpenSnackBar: false,
      CategoryFirstPage: true,

      Update: false,

      MaleFlag: false,
      WomenFlag: false,
      KidFlag: false,
      ProductListFlag: false,
      ClothingType: false,
      CategoryFlag: true,
      MyOrder: false,
      OpenMyOrder: false,
      Size: "",
      ClothPrice: "",
      SizeFlag: false,
      noOfDays: "",
      noOfDaysFlag: false,
      seedOrderBuy: true,
      ClothingStyle: "",
      ProdtNameFlag: false,
      ProductPriceFlag: false,
      QuantityFlag: false,
      SizeOfOwnClothFlag: false,
      FromDateOwnFlag: false,
      ProdtName: "",
      ProductPrice: "",
      Quantity: "",
      SizeOfOwnCloth: "",
      FromDateOwn: "",
      ToDateOwn: "",
      ToDateOwnFlag: false,
      ProductType: "",
      ProductTypeFlag: false,
      VehicalNeed: "",
      VehicalNameFlag: false,
      VehicalName: "",
      QuantityVehicle: "",
      QuantityVehicleFlag: false,
      NoOfDays: "",
      NoOfDaysFlag: false,
      TotalPrice: "",
      PriceVehicle: "",
      PriceVehicleFlag: false,
      OrderDateFlag: false,
      OrdernameFlag: false,
      OrderPriceFlag: false,
      OrderDate: "",
      Ordername: "",
      OrderPrice: "",
      StartDate: "",
      StartDateFlag: false,
      EndDate: "",
      EndDateFlag: false,

      OrderDetails: true,
      Gender: "male",
      Type: "traditional",
      TypeFlag: false,
      GenderFlag: false,
      FromDate: "",
      FromDateFlag: false,
      ToDate: "",
      ToDateFlag: false,
      TiifinPanId: "",
      TiifinPanIdFlag: false,
      TotalDays: "",
      TotalDaysFlag: false,
      BookedBy: "",
      BookedByFlag: false,
      FeedBackPage: false,

      paymentPage: true,
      PaymentModeSelect: "",
      FeedbackFlag: false,
      FeedBack: "",

      AccountNumberFlag: false,
      AccountNumber: "",
      CVV: "",
      CVVFlag: false,
      CustomerName: "",
      CustomerNameFlag: false,

      orderId: "",
      TiffinIDPlan: "",

      OpenCard: false,
    };
  }

  componentWillMount() {
    this.GetOrder(this.state.MyOrderPageNumber);
    this.GetProduct(this.state.PageNumber);
    this.GetProductByUserID(this.state.PageNumber);
  }

  //
  GetOrder = (CurrentPage) => {
    authServices
      .GetOrder(Number(this.state.UserID))
      .then((data) => {
        console.log("GetOrder Data : ", data);
        this.setState({
          MyOrderList: data.data.data,
        });
      })
      .catch((error) => {
        console.log("GetOrder Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  //
  GetProduct = (CurrentPage) => {
    authServices
      .GetProduct()
      .then((data) => {
        console.log("GetOrder Data : ", data);
        this.setState({
          Category: data.data.data,
          ClothingType: true,
        });
      })
      .catch((error) => {
        console.log("GetOrder Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  //
  GetProductByUserID = (CurrentPage) => {
    authServices
      .GetProduct()
      .then((data) => {
        console.log("GetOrder Data : ", data);
        this.setState({
          OwnCloth: data.data.data.filter((X) => X.userID == this.state.UserID),
        });
      })
      .catch((error) => {
        console.log("GetOrder Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  
  getAllFilterOrder = (CurrentPage, Gender, Type) => {
    let data = {
      type: Type.toLowerCase(),
      gender: Gender.toLowerCase(),
    };
    console.log("getAllFilterOrder Request Body : ", data);
    authServices
      .getAllFilterOrder(data)
      .then((data) => {
        console.log("getAllFilterOrder Data  : ", data.data.data);
        this.setState({
          Category: data.data.data
            .slice((CurrentPage - 1) * 4, CurrentPage * 4)
            .reverse(),
        });
      })
      .catch((error) => {
        console.log("getAllFilterOrder Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  //
  AddProduct = async () => {
    if (this.CheckValidationAddProduct()) {
      this.setState({
        OpenSnackBar: true,
        Message: "Please Enter Required Field",
      });
      return;
    }

    let state = this.state;
    const data = new FormData();
    data.append("userID", state.UserID);
    data.append("productImage", state.File);
    data.append("type", state.Type);
    data.append("size", state.SizeOfOwnCloth);
    data.append("productName", state.ProdtName);
    data.append("productPrice", state.ProductPrice);
    data.append("genderType", state.Gender);
    data.append("toDate", state.ToDateOwn);
    data.append("fromDate", state.FromDateOwn);
    data.append("quentity", state.Quantity);
    console.log("Data : ", data);
  
    await authServices
      .AddProduct(data)
      .then((data) => {
        debugger;
        console.log("UpdateImage Data : ", data);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          Message: data.data.message,
        });
        this.GetProduct(this.state.CategoryPageNumber);
      })
      .catch((error) => {
        debugger;
        console.log("UpdateImage Error : ", error);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          Message: "Something went wrong",
        });
        this.GetProduct(this.state.CategoryPageNumber);
      });
  };

  AddRentalProduct = async () => {
    debugger;
    if (this.CheckValidationAddRentalProduct()) {
      this.setState({
        OpenSnackBar: true,
        Message: "Please Enter Required Field",
      });
      return;
    }

    let state = this.state;
    let data = {
      size: state.Size,
      address: state.CustomerAddress,
      mobileNumber: state.CustomerPhoneNo,
      productID: Number(state.ProductID),
      userID: Number(state.UserID),
      customerName: state.CustomerName,
      fromDate: state.StartDate,
      toDate: state.EndDate,
      price: state.CustomerPrice,
    };
  
    await authServices
      .AddRentalProduct(data)
      .then((data) => {
        debugger;
        console.log("UpdateImage Data : ", data);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          Message: data.data.message,
        });
        this.GetProduct(this.state.CategoryPageNumber);
      })
      .catch((error) => {
        debugger;
        console.log("UpdateImage Error : ", error);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          Message: "Something went wrong",
        });
        this.GetProduct(this.state.CategoryPageNumber);
      });
  };

  //
  CheckValidationAddRentalProduct = () => {

    let State = this.state;
    this.setState({
      SizeFlag: false,
      CustomerAddressFlag: false,
      CustomerPhoneNoFlag: false,
      CustomerNameFlag: false,
      StartDateFlag: false,
      EndDateFlag: false,
      CustomerPriceFlag: false,
    });
    let Value = false;
    if (State.Size === "") {
      this.setState({ SizeFlag: true });
      Value = true;
    }
    if (State.CustomerAddress === "") {
      this.setState({ CustomerAddressFlag: true });
      Value = true;
    }
    if (State.CustomerPhoneNo === "") {
      this.setState({ CustomerPhoneNoFlag: true });
      Value = true;
    }
    if (State.CustomerName === "") {
      this.setState({ CustomerNameFlag: true });
      Value = true;
    }
    if (State.StartDate === "") {
      this.setState({ StartDateFlag: true });
      Value = true;
    }
    if (State.EndDate === "") {
      this.setState({ EndDateFlag: true });
      Value = true;
    }
    if (State.CustomerPrice === "") {
      this.setState({ CustomerPriceFlag: true });
      Value = true;
    }

    return Value;
  };


  CheckValidationAddProduct = () => {
    let Value = false;
    let State = this.state;
    this.setState({
      TypeFlag: false,
      SizeFlag: false,
      ProdtNameFlag: false,
      ProductPriceFlag: false,
      GenderFlag: false,
      ToDateFlag: false,
      FromDateFlag: false,
      QuentityFlag: false,
    });

    if (State.AccountNumber.SizeOfOwnCloth === "") {
      this.setState({ SizeFlag: true });
      Value = true;
    }
    if (State.ProdtName === "") {
      this.setState({ ProdtNameFlag: true });
      Value = true;
    }
    if (State.ProductPrice === "") {
      this.setState({ ProductPriceFlag: true });
      Value = true;
    }

    if (State.ToDateOwn === "") {
      this.setState({ ToDateFlag: true });
      Value = true;
    }
    if (State.FromDateOwn === "") {
      this.setState({ FromDateFlag: true });
      Value = true;
    }
    if (State.Quentity === "") {
      this.setState({ QuentityFlag: true });
      Value = true;
    }

    return Value;
  };


  handleCapture = (event) => {
    const reader = new FileReader();
    console.log("File Name : ", event.target.files[0].name);
    this.setState({
      File: event.target.files[0],
      FileName: event.target.files[0].name,
    });
  };

  AddOrder = async (ProductID) => {
    let data = {
      productID: ProductID,
      userID: Number(this.state.UserID),
    };
    await authServices
      .AddOrder(data)
      .then((data) => {
        console.log("AddOrder Data : ", data);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          Message: data.data.message,
        });
      })
      .catch((error) => {
        console.log("AddOrder Error : ", error);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
        });
      });
  };

  handlePluseIcon = () => {
    this.setState({
      OrderDetails: false,
    });
  };
  handleInputChange = (e) => {
    if (e.target.name === "Address") {
      this.setState({
        Address: e.target.value,
      });
      document.getElementById("Address")?.classList.remove("validation");
    }
    if (e.target.name === "SelectArea") {
      this.setState({
        SelectArea: e.target.value,
      });
      document.getElementById("SelectArea")?.classList.remove("validation");
    }
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("e.target.name", e.target.value)
    );
  };


  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      Open: false,
      Update: false,
      OpenBookModel: false,
      FeedbackFlag: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handleCategoryPaging = async (e, value) => {
    let state = this.state;
    console.log("Current Page : ", value);
    this.GetOrder();
    this.GetProduct();
  };

  handleRentalPaging = async (e, value) => {
    let state = this.state;
    console.log("Current Page : ", value);
  };

  handleMyOrderPaging = async (e, value) => {
    let state = this.state;
    console.log("Current Page : ", value);
  };

  SignOut = async () => {
    await localStorage.removeItem("CustomerId");
    await localStorage.removeItem("CustomerName");
    this.props.history.push("/SignIn");
  };

  //
  handleProductListFlag = async () => {
    this.setState({
      ProductListFlag: true,
      CategoryFlag: false,
      FeedBackPage: false,
      MyOrder: false,
      OpenCard: false,
    });

    await this.GetProductByUserID(this.state.OwnClothPageNumber);
  };

  handleCategoryFlag = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      CategoryFlag: true,
      FeedBackPage: false,
      MyOrder: false,
    });
  };

  handleMyOrder = async () => {
    await this.GetOrder(1);
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      CategoryFlag: false,
      MyOrder: true,
      FeedBackPage: false,
      OpenCard: false,
    });
  };

  handleFeedback = () => {
    this.setState({
      ProductListFlag: false,
      CategoryFlag: false,
      MyOrder: false,
      FeedBackPage: true,
    });
  };
  //
  handleOpenCartNav = () => {
    console.log("Handle Open Cart Nav Calling .....");

    localStorage.setItem("ProductListFlag", false);
    localStorage.setItem("OpenCart", true);

    this.setState({
      PageNumber: 1,
      ProductListFlag: false,
      OpenCard: true,
    });

    this.GetAllCardDetails(this.state.PageNumber);
  };

  isValidHandler = () => {
    let isValid = true;

    if (this.state.Address === "") {
      document.getElementById("Address")?.classList.add("validation");
      isValid = false;
    }
    if (this.state.SelectArea === "") {
      document.getElementById("SelectArea")?.classList.add("validation");
      isValid = false;
    }
    return isValid;
  };

  handleInputChangeRental = (e) => {
    let val = e.target.value;
    if (e.target.name === "ProdtName") {
      this.setState({
        ProdtName: e.target.value,
        ProdtNameFlag: false,
      });
    }
    if (e.target.name === "ProductPrice") {
      this.setState({
        ProductPrice: e.target.value,
        ProductPriceFlag: false,
      });
    }
    if (e.target.name === "Quantity") {
      this.setState({
        Quantity: e.target.value,
        QuantityFlag: false,
      });
    }
    if (e.target.name === "SizeOfOwnCloth") {
      this.setState({
        SizeOfOwnCloth: e.target.value,
        SizeOfOwnClothFlag: false,
      });
    }
    if (e.target.name === "FromDateOwn") {
      this.setState({
        FromDateOwn: e.target.value,
        FromDateOwnFlag: false,
      });
    }
    if (e.target.name === "ToDateOwn") {
      this.setState({
        ToDateOwn: e.target.value,
        ToDateOwnFlag: false,
      });
    }
    if (e.target.name === "ProductType") {
      this.setState({
        ProductType: e.target.value,
        ProductTypeFlag: false,
      });
    }
    if (e.target.name === "VehicalNeed") {
      this.setState({
        VehicalNeed: e.target.value,
      });
      document.getElementById("VehicalNeed").classList.remove("validation");
    }

    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("e.target.name", e.target.value)
    );
  };
  

  CheckValidationEdit = () => {
    const {
      ProdtName,
      ProductPrice,
      Quantity,
      SizeOfOwnCloth,
      FromDateOwn,
      ToDateOwn,
      ProductType,
      VehicalNeed,
      VehicalName,
      QuantityVehicle,
      PriceVehicle,
      NoOfDays,
    } = this.state;
    console.log("CheckValidation Calling...");


    if (ProdtName === "") {
      this.setState({
        ProdtNameFlag: true,
      });
    }
    if (ProductPrice === "") {
      this.setState({
        ProductPriceFlag: true,
      });
    }
    if (Quantity === "") {
      this.setState({
        QuantityFlag: true,
      });
    }
    if (SizeOfOwnCloth === "") {
      this.setState({
        SizeOfOwnClothFlag: true,
      });
    }
    if (FromDateOwn === "") {
      this.setState({
        FromDateOwnFlag: true,
      });
    }
    if (ToDateOwn === "") {
      this.setState({
        ToDateOwnFlag: true,
      });
    }
    if (ProductType === "") {
      this.setState({
        ProductTypeFlag: true,
      });
    }
    if (VehicalNeed === "") {
      document.getElementById("VehicalNeed").classList.add("validation");
    }

    if (VehicalNeed === "Yes") {
      if (VehicalName === "") {
        this.setState({
          VehicalNameFlag: true,
        });
      }
      if (QuantityVehicle === "") {
        this.setState({
          QuantityVehicleFlag: true,
        });
      }
      if (PriceVehicle === "") {
        this.setState({
          PriceVehicleFlag: true,
        });
      }
      if (NoOfDays === "") {
        this.setState({
          NoOfDaysFlag: true,
        });
      }
    }
  };

  CheckValidationMyOrder = () => {
    const { Ordername, OrderDate, OrderPrice } = this.state;
    if (Ordername === "") {
      this.setState({
        OrdernameFlag: true,
      });
    }
    if (OrderDate === "") {
      this.setState({
        OrderDateFlag: true,
      });
    }
    if (OrderPrice === "") {
      this.setState({
        OrderPriceFlag: true,
      });
    }
  };

  handleInputChangeMyorder = (e) => {
    let val = e.target.value;
    if (e.target.name === "Ordername") {
      this.setState({
        Ordername: e.target.value,
        OrdernameFlag: false,
      });
    }
    if (e.target.name === "OrderDate") {
      this.setState({
        OrderDate: e.target.value,
        OrderDateFlag: false,
      });
    }
    if (e.target.name === "OrderPrice") {
      this.setState({
        OrderPrice: e.target.value,
        OrderPriceFlag: false,
      });
    }
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("e.target.name", e.target.value)
    );
  };

  handleOpenFeedbackModel = (Product) => {
    this.setState({ OpenFeedback: true, ProductName: Product });
  };

  handleOrderDetailsPage = (e) => {
    const {
      FromDate,
      ToDate,
      TotalDays,
      BookedBy,
      TotalDaysFlag,
      BookedByFlag,
      ToDateFlag,
      FromDateFlag,
    } = this.state;
    if (e.target.name === "FromDate") {
      this.setState({
        FromDate: e.target.value,
        FromDateFlag: false,
      });
    }
    if (e.target.name === "ToDate") {
      this.setState({
        ToDate: e.target.value,
        ToDateFlag: false,
      });
    }
    if (e.target.name === "TiifinPanId") {
      this.setState({
        TiifinPanId: e.target.value,
        TiifinPanIdFlag: false,
      });
    }
    if (e.target.name === "TotalDays") {
      this.setState({
        TotalDays: e.target.value,
        TotalDaysFlag: false,
      });
    }
    if (e.target.name === "BookedBy") {
      this.setState({
        BookedBy: e.target.value,
        BookedByFlag: false,
      });
    }
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("e.target.name", e.target.value)
    );
  };
  CheckValidationOrderDetails = () => {
    const {
      FromDate,
      ToDate,
      TotalDays,
      BookedBy,
      TiifinPanId,
      TotalDaysFlag,
      BookedByFlag,
      ToDateFlag,
      FromDateFlag,
    } = this.state;
    if (FromDate === "") {
      this.setState({
        FromDateFlag: true,
      });
    }
    if (ToDate === "") {
      this.setState({
        ToDateFlag: true,
      });
    }
    if (TiifinPanId === "") {
      this.setState({
        TiifinPanIdFlag: true,
      });
    }

    if (TotalDays === "") {
      this.setState({
        TotalDaysFlag: true,
      });
    }
    if (BookedBy === "") {
      this.setState({
        BookedByFlag: true,
      });
    }
  };

  handleSubmitDetailsPaymentDetails = (e) => {
    let data = {
      orderId: parseInt(this.state.orderId),
      paymentMethod: this.state.PaymentModeSelect.toString().toUpperCase(),
      otherData: "string",
    };
    this.setState({ OpenLoader: true });
    authServices
      .PaymentSave(data)
      .then((data) => {
        console.log("paymentData : ", data);
        this.setState({
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.data.message,
        });
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  };

  handleShowDetails = (id) => {
    this.setState({
      OrderDetails: false,
      TiffinIDPlan: id,
    });
  };

  handleInputChangePayment = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("e.target.namepayment", e.target.value)
    );
  };
  handleClose = () => {
    this.setState({ OpenFeedback: false });
  };

  disablePrevDates = (date) => {
    return date?.getDay() === 0;
  };

  handleSeedOrderDetails = () => {
    this.setState({
      seedOrderBuy: false,
    });
  };

  handleSeedOrderSubmit = () => {
    this.setState({
      paymentPage: false,
    });
  };

  handleGenderCategory = (GenderType) => {
    if (GenderType === "male") {
      this.setState({
        MaleFlag: true,
        WomenFlag: false,
        KidFlag: false,
      });
    } else if (GenderType === "female") {
      this.setState({
        MaleFlag: false,
        WomenFlag: true,
        KidFlag: false,
      });
    } else {
      this.setState({
        MaleFlag: false,
        WomenFlag: false,
        KidFlag: true,
      });
    }
    this.setState({
      ClothingType: true,
      Gender: GenderType,
    });
  };

  handleChangeRadio = (e) => {
    if (e.target.name === "ClothingStyle") {
      this.setState(
        {
          ClothingStyle: e.target.value,
        },
        () => console.log("clothes", e.target.value)
      );
    }
  };

  handleRentalCloths = (productID, productPrices) => {
    console.log(" productID : ", productID, " Product Price : ", productPrices);
    this.setState({
      CategoryFirstPage: false,
      ProductID: productID,
      CustomerPrice: Number(productPrices),
    });
  };

  handleChanges = (e) => {
    const { value, name } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, " value : ", value)
    );
  };

  handleClothChanges = async (e) => {
    const { value, name } = e.target;
    await this.setState(
      { [name]: value },
      console.log("name : ", name, " value : ", value)
    );

    await this.getAllFilterOrder(
      this.state.PageNumber,
      this.state.Gender,
      value
    );
  };

  InsertFeedback = () => {
    let data = {
      username: localStorage.getItem("CustomerName"),
      feedback: this.state.Feedback,
      productName: this.state.ProductName,
    };
    debugger;
    console.log("Feedback Data : ", data);
    authServices
      .AddFeedback(data)
      .then((data) => {
        console.log("Add Feedback data : ", data);
        this.setState({
          OpenSnackBar: true,
          Message: data.data.message,
          OpenFeedback: false,
        });
      })
      .catch((error) => {
        console.log("Add Feedback Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
          OpenFeedback: false,
        });
      });
  };

  DeleteProduct = (ProductID) => {
    authServices
      .DeleteProduct(ProductID)
      .then((data) => {
        console.log("Delete Product data : ", data);
        this.setState({
          OpenSnackBar: true,
          Message: data.data.message,
          OpenFeedback: false,
        });
        this.GetProductByUserID(this.state.OwnClothPageNumber);
      })
      .catch((error) => {
        console.log("Delete Product Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
          OpenFeedback: false,
        });
        this.GetProductByUserID(this.state.OwnClothPageNumber);
      });
  };

  render() {
    console.log("CustomerPrice : ", this.state.CustomerPrice);
    const {
      ProdtNameFlag,
      MyOrder,
      MyOrderList,
      ProdtName,
      ProductPriceFlag,
      ProductPrice,
      Quantity,
      QuantityFlag,
      SizeOfOwnCloth,
      CustomerNameFlag,
      CustomerName,
      CustomerAddressFlag,
      CustomerAddress,
      CustomerPhoneNo,
      CustomerPhoneNoFlag,
      CustomerPrice,
      ClothingType,
      CardNumber,
      CardNumberFlag,
      CVVDetailsFlag,
      CVVDetails,
      ExpiryDateCardFlag,
      ExpiryDateCard,
      CustomerPriceFlag,
      SizeOfOwnClothFlag,
      FromDateOwn,
      FromDateOwnFlag,
      ProductListFlag,
      OwnCloth,
      ToDateOwn,
      ToDateOwnFlag,
      Size,
      SizeFlag,
      OpenSnackBar,
      Message,
      CategoryFlag,
      StartDate,
      StartDateFlag,
      EndDate,
      EndDateFlag,
      OrderDetails,
      FeedbackFlag,
      Feedback,
      FeedBackPage,
      CategoryFirstPage,
      paymentPage,
      PaymentModeSelect,
      Category,
      MaleFlag,
      WomenFlag,
      KidFlag,
      UserID,
    } = this.state;
    return (
      <div className="UserDashBoard-Container">
        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#ef6182" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 21px",
                    boxSizing: "border-box",
                    fontSize: "26px",
                    fontWeight: "bold",
                  }}
                >
                  Styleasy
                </Typography>
                <div className="search" style={{ flexGrow: 0.5 }}>
                  <div className="searchIcon">
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search "
                    classes={{
                      root: "inputRoot",
                      input: "inputInput",
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.SignOut();
                  }}
                >
                  LogOut
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className="SubBody11">
                <div
                  className={CategoryFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCategoryFlag();
                  }}
                >
                  <div className="NavButtonText">Home</div>
                </div>

                <div
                  className={ProductListFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleProductListFlag();
                  }}
                >
                  <div className="NavButtonText">Add Cloths</div>
                </div>

                <div
                  className={MyOrder ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleMyOrder();
                  }}
                >
                  <div className="NavButtonText">My Orders</div>
                </div>
              </div>
              <div className="SubBody22">
                <div className="bodyContent">
                  {ProductListFlag && (
                    <>
                      {OrderDetails ? (
                        <>
                          <div
                            className="sportstitle1 mb-4"
                            style={{ color: "white" }}
                          >
                            Own Cloths Rent{" "}
                            <ControlPointIcon
                              className="iconbtn"
                              onClick={() => this.handlePluseIcon()}
                            />{" "}
                          </div>

                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table
                                className="tableDeliveryboy"
                                aria-label="simple table"
                              >
                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 50,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 115,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        Product Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 100,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        Product Price
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 100,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        Quantity
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 100,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        Size
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 100,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        From Date
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 100,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        To Date
                                      </TableCell>

                                      <TableCell
                                        align="Left"
                                        style={{
                                          width: 100,
                                          fontWeight: 600,
                                          fontSize: 15,
                                        }}
                                      >
                                        Actions
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {Array.isArray(OwnCloth) &&
                                  OwnCloth.length > 0
                                    ? OwnCloth.map((data, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 50 }}
                                              >
                                                {data.productID}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 200 }}
                                              >
                                                {data.productName}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 100 }}
                                              >
                                                {data.productPrice}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 100 }}
                                              >
                                                {data.quentity}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 100 }}
                                              >
                                                {data.size}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 100 }}
                                              >
                                                {data.fromDate}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 100 }}
                                              >
                                                {data.toDate}
                                              </TableCell>
                                              <TableCell
                                                align="Left"
                                                style={{ width: 100 }}
                                              >
                                                <div className="icons">
                                                  <Button
                                                    className="showDetialsbtn"
                                                    size="small"
                                                    onClick={() =>
                                                      this.DeleteProduct(
                                                        data.productID
                                                      )
                                                    }
                                                  >
                                                    delete
                                                  </Button>
                                                  {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                                  {/* <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeletetiffin(data.id)} /> */}
                                                </div>
                                              </TableCell>
                                            </>

                                            {/* )} */}
                                          </TableRow>
                                        );
                                      })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">
                                Product Details
                              </div>
                              <div>
                                <form className="form">
                                  <TextField
                                    className="TextField1"
                                    name="ProdtName"
                                    label="Product Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProdtNameFlag}
                                    value={ProdtName}
                                    onChange={this.handleChanges}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="ProductPrice"
                                    label="Product Price"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProductPriceFlag}
                                    value={ProductPrice}
                                    onChange={this.handleChanges}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="Quantity"
                                    label="Quantity"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={QuantityFlag}
                                    value={Quantity}
                                    onChange={this.handleChanges}
                                  />
                                  <TextField
                                    className="TextField1"
                                    name="SizeOfOwnCloth"
                                    label="Cloth Size"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={SizeOfOwnClothFlag}
                                    value={SizeOfOwnCloth}
                                    onChange={this.handleChanges}
                                  />
                                  <div className="fileImage">
                                    <label className="imagetitle" for="myfile">
                                      Select a Image :
                                    </label>
                                    <div
                                      className="fileInput"
                                      style={{ color: "black" }}
                                    >
                                      <input
                                        className="inputFile"
                                        type="file"
                                        id="myfile"
                                        style={{ width: "100%" }}
                                        onChange={this.handleCapture}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      margin: "0 0 0 20px",
                                    }}
                                  >
                                    Gender :
                                    <RadioGroup
                                      name="Gender"
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                      value={this.state.Gender}
                                      onChange={this.handleChanges}
                                    >
                                      <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                      />
                                      <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                      />
                                      <FormControlLabel
                                        value="kid"
                                        control={<Radio />}
                                        label="Kid"
                                      />
                                    </RadioGroup>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      margin: "0 0 0 20px",
                                    }}
                                  >
                                    Gender :
                                    <RadioGroup
                                      name="Type"
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                      value={this.state.Type}
                                      onChange={this.handleChanges}
                                    >
                                      <FormControlLabel
                                        value="traditional"
                                        control={<Radio />}
                                        label="Traditional"
                                      />
                                      <FormControlLabel
                                        value="western"
                                        control={<Radio />}
                                        label="Western"
                                      />
                                    </RadioGroup>
                                  </div>
                                  <TextField
                                    id="FromDateOwn"
                                    label="From Date"
                                    type="date"
                                    name="FromDateOwn"
                                    error={FromDateOwnFlag}
                                    value={FromDateOwn}
                                    minDate={minDate}
                                    className="textFieldDate"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={this.handleChanges}
                                  />

                                  <TextField
                                    id="ToDateOwn"
                                    label="To Date"
                                    type="date"
                                    name="ToDateOwn"
                                    error={ToDateOwnFlag}
                                    value={ToDateOwn}
                                    defaultValue="2017-05-24"
                                    className="textFieldDate"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={this.handleChanges}
                                  />

                                  <div className="buttons">
                                    <button
                                      className="submitbtn1"
                                      onClick={() => this.AddProduct()}
                                    >
                                      Submit
                                    </button>
                                    <button className="cancelbhn">
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {CategoryFlag && (
                    <>
                      {CategoryFirstPage ? (
                        <>
                          <div className="CategoryBtnDiv">
                            <Button
                              className="btnGender"
                              style={{
                                background: MaleFlag ? "#FF0066" : "",
                                color: MaleFlag ? "" : "white",
                                border: MaleFlag ? "" : "3px solid white",
                              }}
                              variant="outlined"
                              onClick={() => this.handleGenderCategory("male")}
                            >
                              Men
                            </Button>
                            <Button
                              className="btnGender"
                              variant="outlined"
                              style={{
                                background: WomenFlag ? "#FF0066" : "",
                                color: WomenFlag ? "" : "white",
                                border: WomenFlag ? "" : "3px solid white",
                              }}
                              onClick={() =>
                                this.handleGenderCategory("female")
                              }
                            >
                              Women
                            </Button>
                            <Button
                              className="btnGender"
                              variant="outlined"
                              style={{
                                background: KidFlag ? "#FF0066" : "",
                                color: KidFlag ? "" : "white",
                                border: KidFlag ? "" : "3px solid white",
                              }}
                              onClick={() => this.handleGenderCategory("kid")}
                            >
                              Kids
                            </Button>
                          </div>

                          {ClothingType && (
                            <>
                              <RadioGroup
                                name="ClothingStyle"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  padding: " 0px 0px 4px 42px",
                                }}
                                value={this.state.ClothingStyle}
                                onChange={this.handleClothChanges}
                              >
                                <FormControlLabel
                                  value="traditional"
                                  control={<Radio />}
                                  style={{ color: "white" }}
                                  label="Traditional Cloths"
                                />
                                <FormControlLabel
                                  value="western"
                                  control={<Radio />}
                                  style={{ color: "white" }}
                                  label="Western Cloths/PartyWare"
                                />
                              </RadioGroup>
                            </>
                          )}

                          <div
                            className="CardDesiginModel"
                            style={{ display: "flex" }}
                          >
                            {Array.isArray(Category) && Category.length > 0 ? (
                              Category.map((data, index) => {
                                console.log("Categoty Data : ", data);
                                return (
                                  <div className="CardDesign" key={index}>
                                    <div>
                                      {" "}
                                      <img
                                        className="bannerurl"
                                        src={data.imageUrl}
                                        alt="Girl in a jacket"
                                      />
                                    </div>
                                    <div className="clothsDescritpion">
                                      <label>{data.productName}</label>
                                      <label>
                                        Price:&nbsp;{data.productPrice}
                                      </label>
                                    </div>
                                    <div>
                                      {data.userID !== Number(UserID) ? (
                                        <button
                                          className="btnGender"
                                          onClick={() =>
                                            this.handleRentalCloths(
                                              data.productID,
                                              data.productPrice
                                            )
                                          }
                                        >
                                          Rent
                                        </button>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </div>
                          {/* </>
                          )} */}
                        </>
                      ) : (
                        <>
                          {paymentPage ? (
                            <div className="plusContent">
                              <div className="plusContent_sub">
                                <div className="sportstitlePlus">
                                  Rental Details
                                </div>
                                <div>
                                  <form className="form">
                                    <TextField
                                      className="TextField1"
                                      name="CustomerName"
                                      label="Customer Name"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={CustomerNameFlag}
                                      value={CustomerName}
                                      onChange={this.handleChanges}
                                    />
                                    <TextField
                                      className="TextField1"
                                      name="CustomerAddress"
                                      label="Address"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={CustomerAddressFlag}
                                      value={CustomerAddress}
                                      onChange={this.handleChanges}
                                    />
                                    <TextField
                                      className="TextField1"
                                      name="CustomerPhoneNo"
                                      label="Mobile number"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={CustomerPhoneNoFlag}
                                      value={CustomerPhoneNo}
                                      onChange={this.handleChanges}
                                    />
                                    <TextField
                                      type="number"
                                      className="TextField1"
                                      name="CustomerPrice"
                                      label="Price"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={CustomerPriceFlag}
                                      value={CustomerPrice}
                                    />
                                    <TextField
                                      className="TextField1"
                                      name="Size"
                                      label="Cloth size"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={SizeFlag}
                                      value={Size}
                                      onChange={this.handleChanges}
                                    />

                                    <TextField
                                      id="StartDate"
                                      label="From Date"
                                      type="date"
                                      name="StartDate"
                                      error={StartDateFlag}
                                      value={StartDate}
                                      minDate={minDate}
                                      className="textFieldDate"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={this.handleChanges}
                                    />

                                    <TextField
                                      id="EndDate"
                                      label="To Date"
                                      type="date"
                                      name="EndDate"
                                      error={EndDateFlag}
                                      value={EndDate}
                                      defaultValue="2017-05-24"
                                      className="textFieldDate"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={this.handleChanges}
                                    />

                                    <div className="buttons">
                                      <button
                                        className="submitbtn1"
                                        onClick={(e) =>
                                          this.AddRentalProduct(e)
                                        }
                                      >
                                        Submit
                                      </button>
                                      <button className="cancelbhn">
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="plusContent">
                              <div className="plusContent_subPayment">
                                <div className="sportstitlePlus">
                                  Payment Details
                                </div>
                                <div>
                                  <form className="form">
                                    <select
                                      className="TextField2"
                                      name="PaymentModeSelect"
                                      variant="outlined"
                                      size="small"
                                      id="PaymentModeSelect"
                                      style={{ margin: 20 }}
                                      value={PaymentModeSelect}
                                      onChange={(e) =>
                                        this.handleInputChangePayment(e)
                                      }
                                    >
                                      <option value="" disabled selected>
                                        Select Payment Mode
                                      </option>
                                      <option value="Debit">Debit</option>
                                      <option value="Credit">Credit</option>
                                      <option value="UPI">UPI</option>
                                      <option value="NetBanking">
                                        NetBanking
                                      </option>
                                      <option value="COD">COD</option>

                                      {PaymentModeSelect === "Debit" && (
                                        <>
                                          <TextField
                                            className="TextField1"
                                            name="CardNumber"
                                            label="Address"
                                            variant="outlined"
                                            size="small"
                                            style={{ margin: 20 }}
                                            error={CardNumberFlag}
                                            value={CardNumber}
                                            onChange={(e) =>
                                              this.handleInputChangeRental(e)
                                            }
                                          />
                                          <TextField
                                            className="TextField1"
                                            name="CVVDetails"
                                            label="Address"
                                            variant="outlined"
                                            size="small"
                                            style={{ margin: 20 }}
                                            error={CVVDetailsFlag}
                                            value={CVVDetails}
                                            onChange={(e) =>
                                              this.handleInputChangeRental(e)
                                            }
                                          />
                                          <TextField
                                            className="TextField1"
                                            name="ExpiryDateCard"
                                            label="Address"
                                            variant="outlined"
                                            size="small"
                                            style={{ margin: 20 }}
                                            error={ExpiryDateCardFlag}
                                            value={ExpiryDateCard}
                                            onChange={(e) =>
                                              this.handleInputChangeRental(e)
                                            }
                                          />
                                        </>
                                      )}
                                    </select>

                                    <div className="buttons">
                                      <button
                                        className="submitbtn1"
                                        onClick={(e) =>
                                          this.handleSubmitDetailsPaymentDetails(
                                            e
                                          )
                                        }
                                      >
                                        Submit
                                      </button>
                                      <button className="cancelbhn">
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {MyOrder && (
                    <>
                      <div className="GetUserMenus-SubContainer mt-3">
                        <TableContainer component={Paper}>
                          <Table className="" aria-label="simple table">
                            {/* {props.State === "UserHome" ? ( */}
                            <>
                              <TableHead></TableHead>
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 50,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Order ID
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 200,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Product Name
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 210,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    From Date
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 210,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    To Date
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 210,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    UserName
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 210,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Mobile Number
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 210,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Actions
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                            </>
                            <></>
                            <TableBody>
                              {Array.isArray(MyOrderList) &&
                              MyOrderList.length > 0
                                ? MyOrderList.map((data, index) => {
                                    return (
                                      <TableRow key={index}>
                                        {/* {props.State === "UserHome" ? ( */}
                                        <>
                                          <TableCell
                                            align="center"
                                            style={{ width: 200 }}
                                          >
                                            {data.rentalID}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 200 }}
                                          >
                                            {data.productName}
                                          </TableCell>
                                          
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            {moment(data.fromDate)
                                              .format("DD-MM-YYYY")
                                              .toString()}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            {moment(data.toDate)
                                              .format("DD-MM-YYYY")
                                              .toString()}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            {data.customerName}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            {data.mobileNumber}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            <Button
                                              variant="outlined"
                                              className="submitbtn1"
                                              onClick={() => {
                                                this.handleOpenFeedbackModel(
                                                  data.productName
                                                );
                                              }}
                                            >
                                              Feedback
                                            </Button>
                                          </TableCell>
                                          
                                        </>
                                        {/* ) : ( */}
                                        <></>
                                        {/* )} */}
                                      </TableRow>
                                    );
                                  })
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>

                      <Modal
                        open={this.state.OpenFeedback}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                        className="Model-Create-Feedback"
                      >
                        <Fade in={this.state.OpenFeedback}>
                          <div className="Model-Create-Feedback-Main">
                            <div className="Model-Create-Feedback-Header">
                              Send Your Feedback
                            </div>
                            <div className="Model-Create-Feedback-Body">
                              <TextField
                                id="outlined-basic"
                                label="Feedback"
                                name="Feedback"
                                variant="outlined"
                                style={{ width: "100%" }}
                                multiline
                                rows={10}
                                size="small"
                                error={FeedbackFlag}
                                value={Feedback}
                                onChange={this.handleChanges}
                              />
                            </div>
                            <div className="Model-Create-Feedback-Footer">
                              <Button
                                variant="contained"
                                style={{ margin: "10px" }}
                                onClick={() => {
                                  this.handleClose();
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                // color="primary"
                                className="submitbtn1"
                                onClick={() => {
                                  this.InsertFeedback();
                                }}
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                        </Fade>
                      </Modal>

                      <Pagination
                        count={this.state.TotalPages}
                        Page={this.state.PageNumber}
                        onChange={this.handlePaging}
                        variant="outlined"
                        shape="rounded"
                        color="secondary"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="FooterDiv"></div>
        </div>

        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={Message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackBarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
