import React from "react";
import Button from 'react-bootstrap/Button';
import Footer from "../components/Footer";
import './style.css';


var Bakery = () => {
    return (
        
        <div className="bg">
                    <div className="top">
      <nav class="navbar navbar-expand-lg">
      <i className="material-icons">cake</i>  <a class="navbar-brand" href="#">Bakery Link</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Customer Log In <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#">Bakery Log In</a>
    </div>
  </div>
</nav>
</div>
            <div className="container">
            
            <div className="button">
                <Button className="my-3" variant="primary" size="lg" block>Create New Order</Button>
            </div>
            <div className="button">
                <Button className="my-3" variant="primary" size="lg" block>List Orders</Button>
            </div>
            <div className="button">
                <Button className="my-3" variant="primary" size="lg" block>Inventory</Button>
            </div>
        </div>
            <Footer></Footer>
        </div>
    );
}


export default Bakery;