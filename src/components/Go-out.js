import React, { Component } from "react";
import { Carousel, Card, Row, Col, a } from "react-bootstrap";
import { connect } from "react-redux";

class GoOut extends Component { 
  render() {
    let imageArr = [
      "/assets/cover1.jpg",
      "/assets/cover2.jpg",
      "/assets/cover3.jpg",
    ];
    let slide = imageArr.map((img) => {
      return (
        <Carousel.Item key={img}>
          <img
            style={{ width: "35rem", height: "18rem" }}
            src={img}
            alt={"first"}
          />
          <Carousel.Caption>
            <h3>Go out for the fresh Air!</h3>
            <p>Visit Pubs, Bars and Restaurants.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ); 
    });
    let dinerArr = [
        { image: "/assets/pub.jpg", descr: "Go to your favorite pubs for partying with friends,cousins etc ", type: "Pubs" },
        { image: "/assets/restaurants.jpg", descr: "Enjoy a wide variety of cuisines", type: "Restaurants" },
        { image: "/assets/cafe.jpg", descr: "Try new kind of coffee varieties and snacks", type: "Cafes" },
      ];
    let diner = dinerArr.map((diner) => {
      let dinertype=diner.type
      return (
        <Col key={diner.image}>
        <a href="/goout/card-details" onClick={()=>sessionStorage.setItem("dinertype",JSON.stringify({dinertype}))}>
          <Card className="m-4 text-light"  style={{ width: "18rem", height: "12rem" }}>
            <Card.Img src={diner.image} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>{diner.type}</Card.Title>
              <Card.Text>
                {diner.descr}
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </a>
        </Col>
      );
    });

    return (
      <React.Fragment>
        <Carousel>{slide}</Carousel>
        <Row className="m-4">{diner}</Row>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ dinertype }) {
    console.log(dinertype)
    return {
      dinertype,
    }
  }
export default connect(mapStateToProps)(GoOut);
