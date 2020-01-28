import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Bakery from "./pages/Bakery";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import SignupCustomer from "./pages/SignupCustomer";
import SignupBakery from "./pages/SignupBakery";
import LoginCustomer from "./pages/LoginCustomer";
import LoginBakery from "./pages/LoginBakery";
import NoMatch from "./pages/NoMatch";



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/bakery" component={Bakery} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/signup-customer" component={SignupCustomer} />
          <Route exact path="/signup-bakery" component={SignupBakery} />
          <Route exact path="/login-customer" component={LoginCustomer} />
          <Route exact path="/login-bakery" component={LoginBakery} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
