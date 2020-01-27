import React from "react";
import './style.css';
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";


function NoMatch() {
  return (
    <div>
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
