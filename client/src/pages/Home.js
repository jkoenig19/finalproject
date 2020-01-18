import React from "react";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";
import Button from 'react-bootstrap/Button';
import './style.css';


function Home() {
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
                <Button className="btn-block" variant="primary" size="lg">Sign Up</Button>
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

export default Home;
