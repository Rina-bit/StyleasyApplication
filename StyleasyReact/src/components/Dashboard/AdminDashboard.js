import React, { Component } from "react";
import "./AdminDashboard.css";
import AuthServices from "../../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import moment from "moment";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";

const authServices = new AuthServices();

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: localStorage.getItem("AdminId"),
      openModel: false,
      OpenUserHome: true,
      FeedBackDetails: false,
      CustomerListManagement: false,
      TiffinManagement: false,
      DeliveryAddressManagement: false,

      pluseCreateDataDeliveryBoy: false,
      tableDataDeliveryBoy: true,

      tableDatCustomerListManagement: true,
      PluseCustomerListManagement: false,

      tableDataTiffinManagement: true,
      pluseDataTiffinManagement: false,

      FirstnameFlag: false,
      LastnameFlag: false,
      EmailIdFlag: false,
      PasswordFlag: false,
      AdharNoFlag: false,
      Firstname: "",
      Lastname: "",
      EmailId: "",
      Password: "",
      AdharNo: "",
      fdata: new FormData(),
      ImageSelectFlag: false,

      
      ProdtName: "",
      ProductPrice: "",
      Quantity: "",
      SizeOfOwnCloth: "",
      FromDateOwn: "",
      ToDateOwn: "",
      Gender: "male",
      Type: "traditional",

      TypeFlag: false,
      SizeOfOwnClothFlag: false,
      ProdtNameFlag: false,
      ProductPriceFlag: false,
      GenderFlag: false,
      ToDateOwnFlag: false,
      FromDateOwnFlag: false,
      QuantityFlag: false,

      Row: [],
      Feedback: [],
      OwnCloth: [],
      Product: [],
      Rental: [],
      forceUpdate: false,
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      PageNumber: 0,

      FeedbackPageNumber: 1,
      deliveryboodby: "",
      boyiddelivery: "",
      //
      TotalPages: 0,
      TotalRecords: 0,

      Open: false,
      OpenEdit: false, 
      OpenLoader: false,
      OpenSnackBar: false,
      File: new FormData(),
      OpenHome: true,
      OpenAddProduct: false,
      OpenOrderList: false,
      OpenFeedBack: false,
      buttonTiffinChange: true,
      tiffinidSave: 0,
      OrderList: true,
      PlusHomeDataCurrent: false,
      deliveryboylist: "",
      Update: false,
      OpenCustomerList: false,
      ShowApplicantInfo: false,
      OpenBookModel: false, 
    };
  }

  //
  async componentDidMount() {
    await this.getFeedback();
    await this.GetOrder();
    await this.GetProduct(1);
  }

  //
  GetProduct = async (CurrentPage) => {
    await authServices
      .GetProduct()
      .then((data) => {
        console.log("GetProduct Data : ", data);
        this.setState({
          Product: data.data.data,
          ClothingType: true,
        });
      })
      .catch((error) => {
        console.log("GetProduct Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  GetOrder = () => {
    this.setState({ Row: [] });
    authServices
      .GetOrder(-1)
      .then((data) => {
        console.log("GetOrder Data : ", data);
        this.setState({
          Rental: data.data.data,
          OpenSnackBar: true,
          Message: "Read Data Successfully",
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

  getFeedback = () => {
    authServices
      .GetFeedback()
      .then((data) => {
        console.log("Get Feedback Data : ", data);
        this.setState({
          Feedback: data.data.data,
          OpenSnackBar: true,
          Message: data.message,
        });
      })
      .catch((error) => {
        console.log("Get Feedback Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
      });
  };

  GetCustomerList = (CurrentPage) => {
    this.setState({ Row: [] });
    authServices
      .GetCustomerList()
      .then((data) => {
        console.log("GetCustomerList Data : ", data);
        this.setState({
          Row: data.data.data,
          OpenSnackBar: true,
        });
      })
      .catch((error) => {
        console.log("GetCustomerList Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something went wrong",
        });
      });
  };

  DeleteFeedback = (FeedbackID) => {
    authServices
      .DeleteFeedback(FeedbackID)
      .then((data) => {
        console.log("Get Feedback Data : ", data);
        this.setState({
          OpenSnackBar: true,
          Message: data.data.message,
        });
        this.getFeedback();
      })
      .catch((error) => {
        console.log("Get Feedback Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
        this.getFeedback();
      });
  };

  CancleOrder = (RentalID) => {
    authServices
      .DeleteOrder(RentalID)
      .then((data) => {
        console.log("Delete Order Data : ", data);
        this.setState({
          OpenSnackBar: true,
          Message: data.data.message,
        });
        this.GetOrder();
      })
      .catch((error) => {
        console.log("Delete Order Error : ", error);
        this.setState({
          OpenSnackBar: true,
          Message: "Something Went Wrong",
        });
        this.GetOrder();
      });
  };

  AddProduct = async () => {
    console.log("Add Product Calling .. ");
    if (this.CheckValidationAddProduct()) {
      this.setState({
        OpenSnackBar: true,
        Message: "Please Enter Required Field",
      });
      return;
    }

    let state = this.state;
    this.setState({ OpenLoader: true });
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
        console.log("UpdateImage Data : ", data);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          Message: data.data.message,
          OpenLoader: false,
        });
        this.GetProduct(this.state.PageNumber);
      })
      .catch((error) => {
        debugger;
        console.log("UpdateImage Error : ", error);
        this.setState({
          OpenSnackBar: true,
          OpenAddressModel: false,
          OpenLoader: false,
          Message: "Something went wrong",
        });
        this.GetProduct(this.state.PageNumber);
      });
  };

  //
  CheckValidationAddProduct = () => {
    let Value = false;
    let State = this.state;
    this.setState({
      TypeFlag: false,
      SizeOfOwnClothFlag: false,
      ProdtNameFlag: false,
      ProductPriceFlag: false,
      GenderFlag: false,
      ToDateOwnFlag: false,
      FromDateOwnFlag: false,
      QuantityFlag: false,
    });
    debugger;

    if (State.SizeOfOwnCloth === "") {
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
    if (State.Quantity === "") {
      this.setState({ QuentityFlag: true });
      Value = true;
    }

    return Value;
  };

  CheckValidationDeliveryboy = () => {
    const { Firstname, Lastname, EmailId, Password, AdharNo } = this.state;
    console.log("CheckValidation Calling...");


    if (Firstname === "") {
      this.setState({
        FirstnameFlag: true,
      });
    }
    if (Lastname === "") {
      this.setState({
        LastnameFlag: true,
      });
    }
    if (EmailId === "") {
      this.setState({
        EmailIdFlag: true,
      });
    }
    if (Password === "") {
      this.setState({
        PasswordFlag: true,
      });
    }
    if (AdharNo === "") {
      this.setState({
        AdharNoFlag: true,
      });
    }
  };

  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      Update: false,
      OpenEdit: false,
      OpenBookModel: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handlePaging = async (e, value) => {
    debugger;
    let state = this.state;
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });
  };

  SignOut = async () => {
    await localStorage.removeItem("AdminId");
    await localStorage.removeItem("AdminName");
    this.props.history.push("/SignIn");
  };



  handleHomeNav = () => {
    this.setState({
      PageNumber: 0,

      OpenUserHome: true,
      FeedBackDetails: false,
      CustomerListManagement: false,
      TiffinManagement: false,
      DeliveryAddressManagement: false,
      OpenCard: false,
      OpenCustomerList: false,
    });

    this.GetOrder();
  };

  handleFeedBackDetails = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: true,
      DeliveryAddressManagement: false,
      CustomerListManagement: false,
      TiffinManagement: false,
      OpenCard: false,
      OpenCustomerList: false,
    });

    this.getFeedback();
  };

  handleAddCloth = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: true,
      TiffinManagement: false,
      DeliveryAddressManagement: false,
      OpenCustomerList: false,
    });
    this.GetProduct(this.state.PageNumber);
  };

  handleTiffinManangement = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: false,
      TiffinManagement: true,
      OpenCard: false,
      DeliveryAddressManagement: false,
    });
  };

  handleAddClothPluseIcon = () => {
    this.setState({
      tableDatCustomerListManagement: false,
    });
  };

  handleClose = () => {
    this.setState({
      openModel: false,
    });
  };

  handleCustomerList = async () => {
    this.setState({
      OpenCustomerList: true,
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: false,
    });
    await this.GetCustomerList(this.state.PageNumber);
  };

  handleCapture = (event) => {
    const reader = new FileReader();
    console.log("File Name : ", event.target.files[0].name);
    this.setState({
      File: event.target.files[0],
      FileName: event.target.files[0].name,
    });
  };

  handleChanges = (e) => {
    const { value, name } = e.target;
    this.setState(
      { [name]: value },
      console.log("name : ", name, " value : ", value)
    );
  };

  render() {
    let state = this.state;
    const {
      Rental,
      OpenCustomerList,
      OpenUserHome,
      Product,
      Row,
      OwnCloth,
      Feedback,
      tableDatCustomerListManagement,
      FeedBackDetails,
      CustomerListManagement,
      ProdtName,
      ProdtNameFlag,
      ProductPrice,
      ProductPriceFlag,
      Quantity,
      QuantityFlag,
      SizeOfOwnCloth,
      SizeOfOwnClothFlag,
      FromDateOwn,
      FromDateOwnFlag,
      ToDateOwn,
      ToDateOwnFlag,
      Gender,
      Type,
      minDate,
    } = this.state;
    console.log("state : ", state);
    const { classes } = this.props;
    return (
      <div className="AdminDashboard-Container">
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
                    placeholder="Search"
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
                  className={OpenUserHome ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleHomeNav();
                  }}
                >
                  <div className="NavButtonText">Order List</div>
                </div>
                <div
                  className={FeedBackDetails ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleFeedBackDetails();
                  }}
                >
                  <div className="NavButtonText">FeedBack</div>
                </div>
                <div
                  className={
                    CustomerListManagement ? "NavButton1" : "NavButton2"
                  }
                  onClick={() => {
                    this.handleAddCloth();
                  }}
                >
                  <div className="NavButtonText">Add Cloth</div>
                </div>
                <div
                  className={OpenCustomerList ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCustomerList();
                  }}
                >
                  <div className="NavButtonText">Customer List</div>
                </div>
              </div>
              <div className="SubBody21">
                <div className="bodyContent">
                  {OpenUserHome && (
                    <>
                      <div className="GetUserMenus-SubContainerAdmin ">
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
                                    ID
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
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Product Price
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Start From
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    End To
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 50,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    TotalDays
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 50,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    PenalityDays
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      width: 50,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Penality
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
                              {Array.isArray(Rental) && Rental.length > 0
                                ? Rental.map((data, index) => {
                                    console.log("Order Data : ", data);
                                    return (
                                      <TableRow key={index}>
                                        <>
                                          <TableCell
                                            align="center"
                                            style={{ width: 50 }}
                                          >
                                            {data.rentalID}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            {data.productName}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            {data.price}
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
                                            style={{ width: 50 }}
                                          >
                                            {data.totalDays}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 50 }}
                                          >
                                            {data.penalityDays}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 50 }}
                                          >
                                            {data.penality}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            style={{ width: 100 }}
                                          >
                                            <Button
                                              variant="outlined"
                                              onClick={() => {
                                                this.CancleOrder(data.rentalID);
                                              }}
                                            >
                                              Cancle Order
                                            </Button>
                                          </TableCell>
                                        </>
                                      </TableRow>
                                    );
                                  })
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </>
                  )}

                  {FeedBackDetails && (
                    <>
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
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Id
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Customer Name
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 150,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Product Name
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 193,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Feedback
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Action
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {Array.isArray(Feedback) && Feedback.length > 0
                                ? Feedback.map((data, index) => {
                                    return (
                                      <TableRow key={index}>
                                        <>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 200 }}
                                          >
                                            {data.feedbackId}
                                          </TableCell>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 200 }}
                                          >
                                            {data.userName}
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
                                            {data.feedback}
                                          </TableCell>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 100 }}
                                          >
                                            <IconButton
                                              variant="outlined"
                                              onClick={() => {
                                                this.DeleteFeedback(
                                                  data.feedbackId
                                                );
                                              }}
                                            >
                                              <DeleteIcon
                                                style={{ color: "black" }}
                                              />
                                            </IconButton>
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
                  )}

                  {CustomerListManagement && (
                    <>
                      {tableDatCustomerListManagement ? (
                        // <div>
                        <>
                          <div
                            className="sportstitle1 mb-4"
                            style={{ color: "white" }}
                          >
                            Own Cloths Rent{" "}
                            <ControlPointIcon
                              className="iconbtn"
                              onClick={() => this.handleAddClothPluseIcon()}
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
                                  {Array.isArray(Product) && Product.length > 0
                                    ? Product.map((data, index) => {
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
                                      value={Gender}
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
                                    Type :
                                    <RadioGroup
                                      name="Type"
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                      value={Type}
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
                                      onClick={() => {
                                        this.AddProduct();
                                      }}
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

                  {OpenCustomerList && (
                    <>
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
                                      width: 200,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Full Name
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    UserName
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Mobile number
                                  </TableCell>

                                  <TableCell
                                    align="Left"
                                    style={{
                                      width: 100,
                                      fontWeight: 600,
                                      fontSize: 15,
                                    }}
                                  >
                                    Email ID
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {Row.length > 0
                                ? Row.map((data, index) => {
                                    return (
                                      <TableRow>
                                        <>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 200 }}
                                          >
                                            {data.userId}
                                          </TableCell>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 200 }}
                                          >
                                            {data.firstName +
                                              " " +
                                              data.lastName}
                                          </TableCell>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 100 }}
                                          >
                                            {data.userName}
                                          </TableCell>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 100 }}
                                          >
                                            {data.mobileNumber}
                                          </TableCell>
                                          <TableCell
                                            align="Left"
                                            style={{ width: 100 }}
                                          >
                                            {data.emailID}
                                          </TableCell>
                                        </>
                                      </TableRow>
                                    );
                                  })
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="FooterDiv"></div>
          </div>
        </div>

        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={state.Message}
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
