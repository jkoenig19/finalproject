import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";
import './style.css';




class Home extends Component {

  state = { modalshown: false }

  render() {
    return (
      <div className="bg">
        <div className="top">
          <nav className="navbar navbar-expand-lg ">
            <i className="material-icons">cake</i> <br></br><a class="navbar-brand" href="#">Bakery Link</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/login-customer">Customer Log In <span class="sr-only">(current)</span></a>
                <a className="nav-item nav-link active" href="/login-bakery">Bakery Log In</a>
              </div>
            </div>
          </nav>
        </div>
        <Jumbotron>
          <h1>Bakery Link</h1>
          <h2>Making Bakery Orders A Piece Of Cake!</h2>
        </Jumbotron>
      <div className="signUp">
        <button className= "bttnOne" className="btn btn-primary" type="submit" onClick={()=> {this.props.history.replace('/signup-customer')}}>New Customer Sign Up</button>    
        <button className="bttnTwo" className="btn btn-primary" type="submit" onClick={()=> {this.props.history.replace('/signup-bakery')}}>New Bakery Sign Up</button>
</div>
<div className="text">
        <div className="customer">
          <img className="demoimage" src={require("../images/hotfudge.jpg")} width="150px" height="135px" />
          <p className="demoText">  Use Bakery Link to place your bakery orders online and come back to check order status.</p>

        </div>
    <br></br>
    
       <hr></hr>
    

        <div className="bakery">
        <img className="bakeryImage" src={require("../images/four-macaroons-808941.jpg")} width="150px" height="150px" />
        <p className="bakeryText">Bakeries can use Bakery Link to receive online orders from customers, track orders and manage inventory.</p>
  
        </div>
        </div>
<br></br>
<br></br>
<br></br>
        <Footer></Footer>
      </div>


    );
  }
}


export default Home;
