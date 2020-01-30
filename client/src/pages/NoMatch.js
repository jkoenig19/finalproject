import React from "react";
import './style.css';
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import { Link } from 'react-router-dom';


function NoMatch() {
  return (
    <div>
      <div className="top">
        <nav class="navbar navbar-expand-lg">
          <i className="material-icons">cake</i>  <a class="navbar-brand"><Link to="/">Bakery Link</Link></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a className="nav-item nav-link active"><Link to="/login-customer">Customer Log In <span class="sr-only">(current)</span></Link></a>
                <a className="nav-item nav-link active"><Link to="/login-bakery">Bakery Log In</Link></a>

            </div>
          </div>
        </nav>
      </div>


      <Jumbotron>
        <h1 className="display-4">404 Page Not Found</h1>
        <p>
            <span role="img" aria-label="Green Salad Emoji" className="salad">
                🥗
            </span>
        </p>
      </Jumbotron>
      <Footer></Footer>
    </div>

  );
}

export default NoMatch;
