import React, { Component } from "react";
import { Form, Button, Jumbotron, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { login_AsyncActionCreator } from "../actions/index";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      successMessage: "",
      errorMessage:"",
      isLogged:true,
      error:false
    }
  }

  setUserState=(e) => {
    const field = e.target.name;
    this.setState({  [field] :e.target.value});
  }
  componentDidUpdate(prevProps){
      if(prevProps.userdata!==this.props.userdata && this.props.userdata.length>0 ){
        console.log(this.props.userdata)
        const userdata=this.props.userdata
        if(userdata[0].username){
          localStorage.setItem("username",userdata[0].username);
          const { history } = this.props
          history.push("/home");
        }
        else{
          let message=this.props.userdata[0]
          this.setState({errorMessage: message,error:true})
        }
      }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var accountObj ={
      username:this.state.username,
      password:this.state.password
    }
    this.props.dispatch(login_AsyncActionCreator(accountObj))
    console.log(this.props.userdata.length) 
  }
  render() {
    return (
      <React.Fragment>
        <Form className="col-md-4 offset-4 col-sm-6 p-4" >
          <Jumbotron style={{opacity:0.8}}>
          <h1>Login</h1>
            <Form.Group className="form-inline pt-4">
              <Form.Label className="mr-sm-4">Username :</Form.Label>
              <Form.Control name="username" onChange = {this.setUserState} required type="user" placeholder="eg. abc@123" />
            </Form.Group>

            <Form.Group className="form-inline">
              <Form.Label className="mr-sm-4">Password :</Form.Label>
              <Form.Control name="password" onChange = {this.setUserState} required type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" className="pb-4">
              <Form.Check
                type="checkbox"
                label="I agree all the Terms and conditions."
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-4" onClick={this.handleSubmit}>
              Login
            </Button>
            <Alert variant="danger" show={this.state.error}>{this.state.errorMessage}</Alert>
          </Jumbotron>
        </Form>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ userdata }) {
    console.log(userdata)
    return {
        userdata,
    }
  }
export default connect(mapStateToProps)(Login);
  