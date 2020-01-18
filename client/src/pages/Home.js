import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Footer from "../components/Footer";
import Button from 'react-bootstrap/Button';
import './style.css';


class Home extends Component {
  state = { modalshown: false }
  handleClose = () => { }
  showmodal = () => { this.setState({ modalshown: true }) }


  render() {
    return (
      <div className="bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Jumbotron>
                <h1>Welcome to Bakery Link!</h1>
                <h3>making your cake orders a piece of cake!</h3>
              </Jumbotron>
            </div>
            <div className="form-group row">
              <div className="button col-md-4">
                <Button className="btn-block" variant="primary" size="lg" onClick={this.showmodal}>Sign Up</Button>
                <Modal show={this.state.modalshown} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Thank you for choosing Bakery Link!
                  <Form>
                      <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Patty Cake" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="butterandsugar@email.com" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>

                  </Form>
                  </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                </Modal>
              </div>
                <div className="button col-md-4">
                  <Button className="btn-block" variant="primary" size="lg">Customer</Button>
                </div>
                <div className="button col-md-4">
                  <Button className="btn-block" variant="primary" size="lg">Bakery</Button>
                </div>
              </div>
            </div>
          </div>
          < Footer />
        </div>


        );
      }
      }
  
  
  export default Home;
