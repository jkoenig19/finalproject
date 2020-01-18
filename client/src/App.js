import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bakery from "./pages/Bakery";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";



function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/bakery" component={Bakery} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/signup" component={Signup} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
