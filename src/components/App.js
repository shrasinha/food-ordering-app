import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import { Navbar, Nav } from "react-bootstrap";
import Home from "./Home";
import { getfoodItems_AsyncActionCreator } from "../actions/index";
import GoOut from "../components/Go-out";
import SignUp from "../components/Sign-up";
import Login from "../components/Login";
import CardDetails from "../components/Card-details";
import "../App.css";
class App extends Component {
    state={username:""}
  componentDidMount() {
    this.props.dispatch(getfoodItems_AsyncActionCreator())
  }

  render() {
     return (
      <Router>
      <div className="App mt-1 mb-5">
        <NavBar username={this.state.username}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/goout/card-details" component={CardDetails} />
            <Route exact path="/goout" component={GoOut} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Switch>
        <Navbar bg="secondary" className="fixed-bottom mt-4">
          <Nav className="text-light ml-auto">@2020Copyright</Nav>
        </Navbar>
      </div>
      </Router>

    );
  }
}

function mapStateToProps({ food }) {
  return {
    food,
  };
}

export default connect(mapStateToProps)(App);
