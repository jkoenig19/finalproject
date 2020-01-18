import React from "react";
import Jumbotron from "../components/Jumbotron";
import './style.css';


function NoMatch() {
  return (
    <div className="bg">
      <div className="row">
        <div className="col-md-12">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Green Salad Emoji">
              🥗
              </span>
            </h1>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
