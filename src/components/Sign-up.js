import React, { Component } from "react";
import { Form, Button, Jumbotron, Alert } from "react-bootstrap";
import { signup_AsyncActionCreator } from "../actions/index"
import { connect } from "react-redux";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      emailId: "",
      password: "",
      contactNo: "",
      formErrors: {
        emailIdErr: "",
        passwordErr: "",
        contactNoErr: "",
      },
      fieldValidity: {
        emailId: false,
        password: false,
        contactNo: false,
      },
      formValid: false,
      successMessage: "",
      errorMessage:"",
      setShow:false,
      error:false
    };
  }
  componentDidMount() {
    if(this.props.username){this.setState({setShow : true})};
  }
  validateUsername = e => {
    this.setState({ username: e.target.value });
  };
  validateEmail = (e) => {
    const emailId = e.target.value;
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    this.setState({ emailId: e.target.value });
    const pattern = /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
    if (emailId.match(pattern)) {
      formErrors.emailIdErr = "";
      fieldValidity.emailId = true;
    } else {
      formErrors.emailIdErr = "Please Enter a valid emailId";
      fieldValidity.emailId = false;
    }
    this.setState({ fieldValidity: fieldValidity });
    this.setState({
      formValid:
        fieldValidity.emailId &&
        fieldValidity.password &&
        fieldValidity.contactNo,
    });
  };

  validatePassword = (e) => {
    const password = e.target.value;
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    this.setState({ password: e.target.value });
    if (
      password.match(/\d/) &&
      password.length > 5 &&
      password.match(/[!@#$%^&*]/)
    ) {
      formErrors.passwordErr = "";
      fieldValidity.password = true;
    }
     else {
      formErrors.passwordErr = "Please Enter a strong password eg.xyz@12";
      fieldValidity.password = false;
    }
    this.setState({ fieldValidity: fieldValidity });
    this.setState({
      formValid:
        fieldValidity.emailId &&
        fieldValidity.password &&
        fieldValidity.contactNo,
    });
  };
  handlesubmit = (e)=>{
    e.preventDefault();
  }
  validateContactNo = (e) => {
    const contactNo = e.target.value;
    var formErrors = this.state.formErrors;
    var fieldValidity = this.state.fieldValidity;
    this.setState({ contactNo: e.target.value });
    if (contactNo.match(/^[7-9][0-9]{9}$/)) {
      formErrors.contactNoErr = "";
      fieldValidity.contactNo = true;
    }
     else {
      formErrors.contactNoErr = "Please Enter a valid contact no.";
      fieldValidity.contactNo = false;
    }
    this.setState({ fieldValidity: fieldValidity });
    this.setState({
      formValid:
        fieldValidity.emailId &&
        fieldValidity.password &&
        fieldValidity.contactNo,
    });
  };
  addUser=()=>{
    var User={
        username: this.state.username,
        emailId: this.state.emailId,
        password: this.state.password,
        contactNo: this.state.contactNo
    }
    this.props.dispatch(signup_AsyncActionCreator(User))
    if(this.props.userMessage){this.setState({setShow:true})}

  }
  render() {
    let greenAlert =
  <Alert variant="primary" style={{width:"30%"}} className="ml-auto mr-auto" show={this.state.setShow} onClose={() => {this.setState({setShow:false});this.props.dispatch(signup_AsyncActionCreator([]))}} dismissible>{this.props.userMessage}</Alert>
  
    return (
      <React.Fragment>
        {greenAlert}
        <Form className="col-md-4 offset-4 col-sm-6 p-4" onSubmit={this.handlesubmit} >
          <Jumbotron style={{ opacity: 0.8 }} >
            <h1>Register</h1>
            <Form.Group className="form-inline pt-4">
              <Form.Label className="mr-sm-4">Username :</Form.Label>
              <Form.Control
                onChange={this.validateUsername}
                type="username"
                placeholder="eg. abc"
              />
            </Form.Group>
            <Form.Group className="form-inline">
              <Form.Label className="mr-sm-4">Email Id:</Form.Label>
              <Form.Control
                onChange={this.validateEmail}
                type="email"
                placeholder="eg. abc@123.gmail.com"
              />
              <span className="text-danger">
                {this.state.formErrors.emailIdErr}
              </span>
            </Form.Group>
            <Form.Group className="form-inline">
              <Form.Label className="mr-sm-4">Password :</Form.Label>
              <Form.Control
                onChange={this.validatePassword}
                type="password"
                placeholder="Password"
              />
              <span className="text-danger">
                {this.state.formErrors.passwordErr}
              </span>
            </Form.Group>
            <Form.Group className="form-inline">
              <Form.Label className="mr-sm-4">Contact No:</Form.Label>
              <Form.Control
                onChange={this.validateContactNo}
                type="contactNo"
                placeholder="eg. 7745678914"
              />
              <span className="text-danger">
                {this.state.formErrors.contactNoErr}
              </span>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" className="pb-4">
              <Form.Check
                type="checkbox"
                label="I agree all the Terms and conditions."
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!this.state.formValid} onClick={this.addUser}>
              Register
            </Button>
          </Jumbotron>
        </Form>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ userMessage }) {
  console.log(userMessage)
  return {
    userMessage,
  }
}
export default connect(mapStateToProps)(SignUp);
