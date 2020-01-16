import React from "react";
import Jumbotron from "../components/Jumbotron";

function Home() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Jumbotron>
              <h1>Hello, world!</h1>
            </Jumbotron>
          </div>
        </div>
      </div>
    );
}

export default Home;
