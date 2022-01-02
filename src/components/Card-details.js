import React, { Component } from "react";
import { Button, Card, Col, Row, Alert } from "react-bootstrap";
import {
  getDinerdata_AsyncActionCreator,
  updateDinerdata_AsyncActionCreator,
} from "../actions/index";
import { connect } from "react-redux";

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dinerArr: [],
      errorMessage: "",
      setShow: false,
      warning: false,
    };
  }
  setShow = false;

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.dinerdata) ===
      JSON.stringify(prevProps.dinerdata)
    ) {
      if (!this.state.setShow) {
        this.props.dispatch(getDinerdata_AsyncActionCreator());
      }
    }
  }

  update = (id) => {
    if (localStorage.getItem("username")) {
      this.props.dispatch(updateDinerdata_AsyncActionCreator(id));
      if (this.props.successMessage) {
        this.setState({ setShow: true });
      }

      // axios.put("http://localhost:7777/dinerData/"+id).then((response) => {
      //   this.setState({ successMessage: response.data, setShow : true });
      // }).catch((error) => {
      //   if(error.response){
      //     this.setState({errorMessage:error.response.data.message,successMessage:""});
      //   }
      //   else{
      //     this.setState({errorMessage:error.message,successMessage:""});
      //   }
      // })
    } else {
      this.setState({ warning: true });
    }
  };

  render() {
    const dinerdata = this.props.dinerdata;
    let greenAlert = (
      <Alert
        variant="success"
        style={{ width: "30%" }}
        className="ml-auto mr-auto"
        show={this.state.setShow}
        onClose={() => this.setState({ setShow: false })}
        dismissible
      >
        Booked a Table! Have a great time.
      </Alert>
    );
    let redAlert = (
      <Alert
        variant="danger"
        style={{ width: "30%" }}
        className="ml-auto mr-auto"
        show={this.state.warning}
        onClose={() => this.setState({ warning: false })}
        dismissible
      >
        Please Login to book a Table.
      </Alert>
    );

    let dinerCard = dinerdata?.map((item) => {
      return (
        <Col key={item.dinerId}>
          <Card
            style={{ width: "20rem", height: "20rem" }}
            border="info"
            className="m-4"
          >
            <Card.Img width="50%" height="41%" variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.dinerName}</Card.Title>
              <Card.Subtitle className="mb-1 text-muted">
                {item.time}
              </Card.Subtitle>
              <Card.Text className="mb-1">
                Table Available:
                <span className="text-success"> {item.seatsAvailable} </span>
              </Card.Text>
              <Card.Subtitle className="mb-1 text-info">
                Price: {item.price}
              </Card.Subtitle>
              <Card.Text className="mb-1">{item.contactDetails}</Card.Text>
              <Button
                disabled={item.seatsAvailable < 1}
                variant="info"
                className="mb-1"
                onClick={() => {
                  this.update(item.dinerId);
                }}
              >
                Book a Table
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (
      <React.Fragment>
        <Row>{greenAlert}</Row>
        <Row>{redAlert}</Row>
        <Row className="bg-light">{dinerCard}</Row>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ dinerdata, successMessage }) {
  return {
    dinerdata,
    successMessage,
  };
}
export default connect(mapStateToProps)(CardDetails);
