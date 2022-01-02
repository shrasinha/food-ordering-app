import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";

class NavBar extends Component {
  username=""
  render() {
    if(this.props.userdata.length>0){this.username=this.props.userdata[0]?.username;console.log("from if"+this.username)}
    else{this.username=localStorage.getItem("username"); console.log("from else"+this.username)}
    return (
      <React.Fragment>
        <Navbar bg="secondary" variant="dark">
          <Navbar.Brand>Foodie</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/goout">Go Out</Nav.Link>
          </Nav>

          {this.username ? (
            <Nav>
              <Nav.Link href="/login" onClick={() => localStorage.clear()}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>
          )}
        </Navbar>
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
export default connect(mapStateToProps)(NavBar);
