import React, { Component } from "react";
import "./SignUp.css";

import AuthServices from "../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const authServices = new AuthServices();

const PasswordRegex = RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
);

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      Radiovalue: "Admin",
      UserName: "",
      FirstName: "",
      LastName: "",
      EmailID: "",
      Password: "",
      ConfirmPassword: "",
      Role: "",
      MasterPassword: "",

      UserNameFlag: "",
      FirstNameFlag: false,
      LastNameFlag: false,
      EmailIDFlag: false,
      Adharno: "",
      AdharnoFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
      MasterPasswordFlag: false,
      RoleFlag: false,

      open: false,
      Message: "",
    };
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  CheckValidity() {
    console.log("Check Validity Calling");
    //Reset Flag
    this.setState({
      UserNameFlag: false,
      FirstNameFlag: false,
      LastNameFlag: false,
      EmailIDFlag: false,
      AdharnoFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
      RoleFlag: false,
      MasterPasswordFlag: false,
    });

    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }

    if (this.state.FirstName === "") {
      this.setState({ FirstNameFlag: true });
    }
    if (this.state.LastName === "") {
      this.setState({ LastNameFlag: true });
    }

    if (this.state.EmailID === "") {
      this.setState({ EmailIDFlag: true });
    }
    if (this.state.Adharno === "") {
      this.setState({ AdharnoFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }
    if (this.state.ConfirmPassword === "") {
      this.setState({ ConfirmPasswordFlag: true });
    }

    if (this.state.Role === "admin" && this.state.MasterPassword === "") {
      this.setState({ MasterPasswordFlag: true });
    }
  }

  handleSubmit = (e) => {
    if (!this.state.PasswordFlag) {
      this.CheckValidity();
      if (
        this.state.Role.toLowerCase() === "admin" &&
        this.state.MasterPassword === ""
      ) {
        this.setState({
          MasterPasswordFlag: true,
          open: true,
          Message: "Please Enter Master Password",
        });
        return;
      }
      if (
        this.state.UserName !== "" &&
        this.state.LastName !== "" &&
        this.state.FirstName !== "" &&
        this.state.Password !== "" &&
        this.state.ConfirmPassword !== ""
      ) {
        const data = {
          userName: this.state.UserName,
          firstName: this.state.FirstName,
          lastName: this.state.LastName,
          emailID: this.state.EmailID,
          mobileNumber: this.state.Adharno.toString(),
          password: this.state.Password,
          configPassword: this.state.ConfirmPassword,
          role: this.state.Role.toUpperCase(),
          masterPassword: this.state.MasterPassword,
        };

        authServices
          .SignUp(data)
          .then((data) => {
            console.log("data : ", data);
            if (data.data.isSuccess) {
              this.props.history.push("/SignIn");
            } else {
              console.log("Sign Up Failed");
              this.setState({ open: true, Message: data.data.message });
            }
          })
          .catch((error) => {
            console.log("error : ", error);
            this.setState({ open: true, Message: "Something Went Wrong" });
          });
      } else {
        console.log("Not Acceptable");
        this.setState({ open: true, Message: "Please Fill Required Field" });
      }
    } else {
      this.setState({ open: true, Message: "Please Fill Valid Password" });
    }
  };

  handleChangePassword = (e) => {
    const { name, value } = e.target;
    console.log("Regex Match : ", PasswordRegex.test(value));
    if (!PasswordRegex.test(value)) {
      this.setState({ PasswordFlag: true });
    } else {
      this.setState({ PasswordFlag: false });
    }
    this.setState(
      { [name]: value },
      console.log(
        "Name : ",
        name,
        "Value : ",
        value,
        " PasswordFlag : ",
        this.state.PasswordFlag
      )
    );
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "FirstName") {
      this.setState({
        FirstName: e.target.value,
        FirstNameFlag: false,
      });
    }
    if (e.target.name === "LastName") {
      this.setState({
        LastName: e.target.value,
        LastNameFlag: false,
      });
    }

    if (e.target.name === "EmailID") {
      this.setState({
        EmailID: e.target.value,
        EmailIDFlag: false,
      });
    }
    if (e.target.name === "Adharno") {
      this.setState({
        Adharno: e.target.value,
        AdharnoFlag: false,
      });
    }

    if (e.target.name === "Role") {
      this.setState({
        Role: e.target.value,
        RoleFlag: false,
      });
    }

    this.setState(
      { [name]: value },
      console.log("Name : ", name, "Value : ", value)
    );
  };

  handleRadioChange = (e) => {
    this.setState({ Radiovalue: e.target.value });
  };

  handleSignIn = (e) => {
    this.props.history.push("/SignIn");
  };

  render() {
    console.log("state : ", this.state);
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Title">Styleasy</div>
          <div className="Header_Container">Registration</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="UserName"
                label="UserName"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.UserNameFlag}
                value={this.state.UserName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="FirstName"
                label="FirstName"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.FirstNameFlag}
                value={this.state.FirstName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="LastName"
                label="LastName"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.LastNameFlag}
                value={this.state.LastName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="EmailID"
                label="EmailID"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.EmailIDFlag}
                value={this.state.EmailID}
                onChange={this.handleChange}
              />
              <TextField
                type="number"
                className="TextField"
                name="Adharno"
                label="Mobile Number"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.AdharnoFlag}
                value={this.state.Adharno}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChangePassword}
              />
              {this.state.PasswordFlag ? (
                <div className="PassError">
                  Password Must Contain Upper Letter, Lower Letter, Symbol &
                  Number.
                </div>
              ) : (
                <></>
              )}
              <TextField
                className="TextField"
                type="password"
                name="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.ConfirmPasswordFlag}
                value={this.state.ConfirmPassword}
                onChange={this.handleChange}
              />
              {this.state.Role == "admin" ? (
                <TextField
                  className="TextField"
                  type="password"
                  name="MasterPassword"
                  label="Master Password"
                  variant="outlined"
                  size="small"
                  style={{ margin: 10 }}
                  error={this.state.MasterPasswordFlag}
                  value={this.state.MasterPassword}
                  onChange={this.handleChange}
                />
              ) : (
                <></>
              )}

              <RadioGroup
                //   aria-label="gender"
                name="Role"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
                value={this.state.Role}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
            </form>
          </div>
          <div className="Buttons">
            <Button color="primary" onClick={this.handleSignIn}>
              Sign In
            </Button>
            <Button
              className="Btn"
              variant="contained"
              onClick={() => this.handleSubmit()}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.Message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
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
