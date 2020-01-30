import React , { Component } from "react";
import Footer from "../components/Footer";
import './style.css';
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from 'react-router-dom';
import API from "../utils/API";



class Bakery extends Component {
  state = {
    bakery: [],
    customerPhone: "",
    dateOfPickup: "",
    writingOnCake: "",
    decorations: "",
    cookieQuantity:"",
    cupcakeQuantity:"",
    valueFlavor: "",
    valueSize: "",
    valueOutside: "",
    valueInside: "",
    subtotal: false,
    inputForm: false,
    customer: [],
    employee: "",
    registeredCustomer: true,
    newName: "",
    customerName: ""
  };

  componentDidMount() {
    const currentUser = sessionStorage.getItem("username");
    API.getBakeries()
    .then(res => {
        const bakeryInfo = res.data.filter(data => data.username === currentUser);
        this.setState({bakery: bakeryInfo[0]});
    })
    .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getOrders()
    .then(res => {
      const orders = res.data;
      const bakeryOrders = orders.filter(order => order.bakeryID === this.state.bakery._id);
      let nextBakeryOrderNumber = 1;
      bakeryOrders.forEach(order => {
        if (order.bakeryOrderID >= nextBakeryOrderNumber){
          nextBakeryOrderNumber = order.bakeryOrderID + 1;
        }
      })
      let cookiesSelected = "";
      let cupcakesSelected = "";
      if (this.state.cookieQuantity){
        cookiesSelected = "yes";
      }
      if (this.state.cupcakeQuantity){
        cupcakesSelected = "yes";
      }
      API.saveOrder({
        bakeryID: this.state.bakery._id,
        bakeryOrderID: nextBakeryOrderNumber,
        customerID: this.state.customer._id,
        dueDate: this.state.dateOfPickup,
        size: this.state.valueSize,
        flavor: this.state.valueFlavor,
        buttercreamInside: this.state.valueInside,
        buttercreamOutside: this.state.valueOutside,
        writing: this.state.writingOnCake,
        decorations: this.state.decorations,
        orderSubmittedBy: this.state.employee,
        status: "Submitted",
        cookies: cookiesSelected,
        cookiesQuantity: this.state.cookieQuantity,
        cupcakes: cupcakesSelected,
        cupcakesQuantity: this.state.cupcakeQuantity
      })
      .then(
        this.setState({inputForm: true})
      )
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  handleSubtotalSubmit = event => {
    event.preventDefault();
    API.getCustomers()
    .then(res => {
      const customers = res.data;
      console.log(customers)
      const orderCustomer = customers.filter(customer => customer.phone === this.state.customerPhone);
      if (orderCustomer.length !== 0){
        this.setState({customer: orderCustomer[0], customerName: orderCustomer[0].name})
      }
      else {
        this.setState({registeredCustomer: false})
      }
    })
    this.setState({subtotal: true});
  }

  handleRestartSubmit = event => {
    event.preventDefault();
    this.setState({subtotal: false});
  }

  handleNewSubmit = event => {
    event.preventDefault();
    this.setState({subtotal: false, inputForm: false});
    this.setState({customerPhone: "", dateOfPickup: "", valueSize: "", valueFlavor: "", valueOutside: "", valueInside: "", 
    writingOnCake: "", decorations: "", cookieQuantity: "", cupcakeQuantity: ""})
  }

  handleCustomerNewSubmit = event => {
    event.preventDefault();
    API.saveCustomer({
      name: this.state.newName,
      phone: this.state.customerPhone
    })
    .then(res => {
        const newCustomer = res.data;
        this.setState({customer: newCustomer})
        this.setState({customerName: this.state.newName, registeredCustomer: true})
      }
    )
    .catch(err => console.log(err));
  }

  handleLogOut = event => {
    event.preventDefault();
    sessionStorage.clear();
    window.location.replace("/")
  }


  render() {
    const authorization = sessionStorage.getItem("registered");
    if (authorization !== "bakery"){
      window.location.replace("/signup-bakery")
    }
    else {   
      return (
        
        <div className="bg">
          <div className="top">
            <nav class="navbar navbar-expand-lg">
              <i className="material-icons">cake</i> <a class="navbar-brand"><Link to="/">Bakery Link</Link></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-item nav-link active"><Link to="/login-customer">Customer Log In <span class="sr-only">(current)</span></Link></a>
                  <a class="nav-item nav-link"><Link to="/login-bakery">Bakery Log In</Link></a>
                </div>
              </div>
            </nav>
          </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 registeredTop">
                <p className="welcome">{this.state.bakery.name} Page</p>
                <p>Create a bakery order below, or go to the Orders page for orders, or the Inventory page for inventory.</p>
                </div>
              </div>

             <div className="order">
             <h1>Create Order</h1>
             <br></br>
             {!this.state.inputForm ? (
             !this.state.subtotal ? (
               <form>
                 <Input
                 value={this.state.customerPhone}
                 onChange={this.handleInputChange}
                 name="customerPhone"
                 placeholder="Customer Phone Number"
               />
               <Input
                 value={this.state.dateOfPickup}
                 onChange={this.handleInputChange}
                 name="dateOfPickup"
                 placeholder="Date of Pickup"
               />
               <p className="textOrderForm">Cake Flavor</p>
               <select className="form-control" name="valueFlavor" onChange ={this.handleInputChange} value={this.state.valueFlavor}>
                   <option value="" disabled selected>- Select flavor -</option>
                   <option value ="Vanilla">Vanilla</option>
                   <option value ="Chocolate">Chocolate</option>
                   <option value ="Carrot">Carrot</option>
                   <option value ="Red Velvet">Red Velvet</option>
               </select>
               <p className="textOrderForm">Cake Size</p>
               <select className="form-control" name="valueSize" onChange ={this.handleInputChange} value={this.state.valueSize}>
                   <option value="" disabled selected>- Select size -</option>
                   <option value ="6 inch">6 inch</option>
                   <option value ="9 inch">9 inch</option>
                   <option value ="12 inch">12 inch</option>
                   <option value ="14 inch">14 inch</option>
                   <option value ="1/4 Sheet">1/4 Sheet</option>
                   <option value ="1/2 Sheet">1/2 Sheet</option>
               </select>
               <p className="textOrderForm">Buttercream Outside</p>
               <select className="form-control" name="valueOutside" onChange ={this.handleInputChange} value={this.state.valueOutside}>
                   <option value="" disabled selected>- Select buttercream outside -</option>
                   <option value ="Vanilla">Vanilla</option>
                   <option value ="Almond">Almond</option>
                   <option value ="Blackberry">Blackberry</option>
                   <option value ="Chocolate">Chocolate</option>
                   <option value ="Mocha">Mocha</option>
                   <option value ="Mint">Mint</option>
                   <option value ="Strawberry">Strawberry</option>
                   <option value ="Caramel">Caramel</option>
                   <option value ="Peanut Butter">Peanut Butter</option>
                   <option value ="Raspberry">Reaspberry</option>
                   <option value ="Blueberry">Blueberry</option>
                   <option value ="Cream Cheese">Cream Cheese</option>
                   <option value ="Ganache">Ganache</option>
               </select>
               <p className="textOrderForm">Buttercream Inside</p>
               <select className="form-control" name="valueInside" onChange ={this.handleInputChange} value={this.state.valueInside}>
                   <option value="" disabled selected>- Select buttercream inside -</option>
                   <option value ="Vanilla">Vanilla</option>
                   <option value ="Almond">Almond</option>
                   <option value ="Blackberry">Blackberry</option>
                   <option value ="Chocolate">Chocolate</option>
                   <option value ="Mocha">Mocha</option>
                   <option value ="Mint">Mint</option>
                   <option value ="Strawberry">Strawberry</option>
                   <option value ="Caramel">Caramel</option>
                   <option value ="Peanut Butter">Peanut Butter</option>
                   <option value ="Raspberry">Reaspberry</option>
                   <option value ="Blueberry">Blueberry</option>
                   <option value ="Cream Cheese">Cream Cheese</option>
                   <option value ="Ganache">Ganache</option>
               </select>
               <br></br>
               <TextArea
                 value={this.state.writingOnCake}
                 onChange={this.handleInputChange}
                 name="writingOnCake"
                 placeholder="Writing on cake"
               />
                 <TextArea
                 value={this.state.decorations}
                 onChange={this.handleInputChange}
                 name="decorations"
                 placeholder="Decoration(s)"
               />
                 <Input
                 value={this.state.cookieQuantity}
                 onChange={this.handleInputChange}
                 name="cookieQuantity"
                 placeholder="How many cookies does the customer want?"
               />
                 <Input
                 value={this.state.cupcakeQuantity}
                 onChange={this.handleInputChange}
                 name="cupcakeQuantity"
                 placeholder="How many cupcakes does the customer want?"
               />
                 <Input
                 value={this.state.employee}
                 onChange={this.handleInputChange}
                 name="employee"
                 placeholder="Enter your name"
               />
               <FormBtn
                 onClick={this.handleSubtotalSubmit}
               >
                 Enter Order Details
               </FormBtn>
               </form>
             ) : (
               <div>
                 {!this.state.registeredCustomer ? (
                  <div>
                  <p className="textOrderForm">Enter name for unregistered customer</p>
                  <Input
                  value={this.state.newName}
                  onChange={this.handleInputChange}
                  name="newName"
                  placeholder="name"
                  />
                  <FormBtn
                  onClick={this.handleCustomerNewSubmit}
                  >
                  Submit
                  </FormBtn>
                  </div>
                  ) : (
                    <div>
                    <p className="textOrderForm">Order Details</p>
                    <p className="textOrderForm">Customer: {this.state.customerName ? this.state.customerName : "No selection"}</p>
                    <p className="textOrderForm">Date of Pickup: {this.state.dateOfPickup ? this.state.dateOfPickup : "No date entered"}</p>
                    <p className="textOrderForm">Cake Flavor: {this.state.valueFlavor ? this.state.valueFlavor : "No selection"}</p>
                    <p className="textOrderForm">Cake Size: {this.state.valueSize ? this.state.valueSize : "No selection"}</p>
                    <p className="textOrderForm">Buttercream Outside: {this.state.valueOutside ? this.state.valueOutside : "No selection"}</p>
                    <p className="textOrderForm">Buttercream Inside: {this.state.valueInside ? this.state.valueInside: "No selection"}</p>
                    <p className="textOrderForm">Writing On Cake: {this.state.writingOnCake ? this.state.writingOnCake : "No writing entered"}</p>
                    <p className="textOrderForm">Decoration(s): {this.state.decorations ? this.state.decorations : "No decorations entered"}</p>
                    <p className="textOrderForm">Cookie Quantity: {this.state.cookieQuantity ? this.state.cookieQuantity : "No quantity entered"}</p>
                    <p className="textOrderForm">Cupcake Quantity: {this.state.cupcakeQuantity ? this.state.cupcakeQuantity : "No quantity entered"}</p>
                    <p className="textOrderForm">Order Entered By: {this.state.employee ? this.state.employee : "No name entered"}</p>
                    <FormBtn
                      onClick={this.handleFormSubmit}
                    >
                      Submit Order
                    </FormBtn>
                    <GoBackBtn
                      onClick={this.handleRestartSubmit}
                    >
                      Change Order Details
                    </GoBackBtn>
                    </div>
                    )}
                    </div>
             )) : (
               <div>
                 <p className="textOrderForm">Order submitted! Select new order to create another order.</p>
               <FormBtn
                 onClick={this.handleNewSubmit}
               >
                 New Order
               </FormBtn>
               </div>
             )}
             </div>
           </div>
            <Footer></Footer>
        </div>
    );
    }
  }
}


export default Bakery;