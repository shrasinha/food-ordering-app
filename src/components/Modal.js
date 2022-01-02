import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DetailsModal extends Component {
  render() {
    let username= localStorage.getItem("username")
    return (
      <React.Fragment>
        {username?(<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-info">Enjoy Your Food!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.item.contactDetails}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>):
        (<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-warn">OOPS!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please Login to order.</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>)}
      </React.Fragment>
    );
  }
}

export default DetailsModal;
