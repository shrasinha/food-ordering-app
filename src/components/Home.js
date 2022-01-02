import React, { Component } from "react";
import {
  Form,
  FormControl,
  Button,
  Card,
  Row,
  Alert,
} from "react-bootstrap";
import { connect } from "react-redux";
import DetailsModal from "./Modal";
import { getyourfood,getfoodItems_AsyncActionCreator } from "../actions/index";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      modalShow: false,
      details: [],
      setShow: false,
    };
  }
  componentDidMount() {
    console.log(localStorage.getItem("username"))
    let username= localStorage.getItem("username");
    if(username){this.setState({setShow : true})};
  }
  search = () => {
    if(this.state.filter){
    this.props.dispatch(getyourfood(this.state.filter))
    }
    else{
      this.props.dispatch(getfoodItems_AsyncActionCreator())
    }
  }
  render() {
    const {food} = this.props;
    let modalclose = () => {
      this.setState({ modalShow: false });
    };

    let FoodItem = food?.map((item) => {
      return (
          <Card key={item.itemId}
            style={{ width: "20rem", height: "36rem" }}
            border="info"
            className="m-4"
          >
            <Card.Img width="50%" height="40%" variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.itemName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.weight}
              </Card.Subtitle>
              <Card.Text>{item.descr}</Card.Text>
              <Card.Subtitle className="mb-2 text-info">
                Price:{item.price}
              </Card.Subtitle>
            </Card.Body>
            <Button
              variant="info"
              onClick={() => this.setState({ modalShow: true, details: item })}
            >
              Order now
            </Button>
            <Card.Footer>
              <small className="text-muted">
                Avail 10% offer.Use "FOODIE" code
              </small>
            </Card.Footer>
            <DetailsModal
              show={this.state.modalShow}
              onHide={modalclose}
              item={this.state.details}
            ></DetailsModal>
          </Card>
        
      )
    });
    let alert = (
      <Alert
        variant="success"
        style={{ width: "30%" }}
        className="ml-auto mr-auto"
        show={this.state.setShow}
        onClose={() => this.setState({ setShow: false })}
        dismissible
      >
        Welcome {localStorage.getItem("username")}!
      </Alert>
    );

    return (
      <React.Fragment>
        {alert}
        <h1 className="text-center text-dark p-5 bg-light">
          What do you wanna have today?
        </h1>
        <Form inline className="p-4">
          <FormControl
            variant="outline-light"
            type="text"
            placeholder="Find your food here"
            className="ml-auto mr-sm-2 text-center"
            style={{ width: "30%" }}
            onChange={(e) => this.setState({ filter: e.target.value })}
          />
          <Button
            variant="outline-light"
            className="mr-auto"
            onClick={this.search}
          >
            Search
          </Button>
        </Form>
        <Row>{FoodItem}</Row>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ food }) {
  return {
    food,
  }
}

export default connect(mapStateToProps)(Home);
