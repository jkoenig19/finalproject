import React , { Component } from "react";
import './style.css';
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';




class Customer extends Component {
   state = {
     customer: [],
     selectedBakery: "",

     dateOfPickup: "",
     writingOnCake: "",
     decorations: "",
     cookieQuantity:"",
     cupcakeQuantity:"",
     valueFlavor: "",
     valueSize: "",
     valueOutside: "",
     valueInside: "",
     location: "",
     databaseBakeries: [],
     bakeryNames: [],
     subtotal: false,
     inputForm: false,
     previousOrders: [],
     bakeryLocation: "",
     map: "",
     mapMessage: "Your Saved Location"
   };

   componentDidMount() {
     const currentUser = sessionStorage.getItem("username");
     API.getCustomers()
     .then(res => {
         const customerInfo = res.data.filter(data => data.username === currentUser);
         this.setState({customer: customerInfo[0]});
         this.loadMap();
         const currentCustomerID = customerInfo[0]._id;
         this.loadPreviousOrders(currentCustomerID);
     })
     .catch(err => console.log(err));
     API.getBakeries()
     .then(res => {
         const savedBakeries = res.data;
         const nameArray = [];
         savedBakeries.forEach(bakery => {
           nameArray.push(bakery.name);
         })
         this.setState({databaseBakeries: savedBakeries, bakeryNames: nameArray})
     })
     .catch(err => console.log(err));
   }

   loadMap = () => {
       const keyTest = process.env.REACT_APP_mapquest_key;
       this.setState({ map: "https://www.mapquestapi.com/staticmap/v5/map?locations=" + this.state.customer.location + "&size=300,200&zoom=15&key=" + keyTest + "&scalebar=true|bottom"});
   }

   loadBakery = () => {
     const keyTest = process.env.REACT_APP_mapquest_key;
     this.setState({ map: "https://www.mapquestapi.com/staticmap/v5/map?locations=" + this.state.bakeryLocation + "&size=300,200&zoom=15&key=" + keyTest + "&scalebar=true|bottom"});
     this.setState({mapMessage: "Location of bakery in last submitted order"})
   }
 
   handleInputChange = event => {
     const { name, value } = event.target;
     this.setState({
       [name]: value
     });
   };

   handleFormSubmit = event => {
     event.preventDefault();
     const chosenBakery = this.state.databaseBakeries.filter(bakery => bakery.name === this.state.selectedBakery);
     this.setState({bakeryLocation: chosenBakery[0].location})
     API.getOrders()
     .then(res => {
       const orders = res.data;
       const bakeryOrders = orders.filter(order => order.bakeryID === chosenBakery[0]._id);
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
         bakeryID: chosenBakery[0]._id,
         bakeryOrderID: nextBakeryOrderNumber,
         customerID: this.state.customer._id,
         dueDate: this.state.dateOfPickup,
         size: this.state.valueSize,
         flavor: this.state.valueFlavor,
         buttercreamInside: this.state.valueInside,
         buttercreamOutside: this.state.valueOutside,
         writing: this.state.writingOnCake,
         decorations: this.state.decorations,
         orderSubmittedBy: this.state.customer.name,
         status: "Submitted",
         cookies: cookiesSelected,
         cookiesQuantity: this.state.cookieQuantity,
         cupcakes: cupcakesSelected,
         cupcakesQuantity: this.state.cupcakeQuantity
       })
       .then(
         this.setState({inputForm: true})
       )
       .then(
         this.loadBakery()
       )
       .then(
         this.loadPreviousOrders(this.state.customer._id)
       )
       .catch(err => console.log(err));
     })
     .catch(err => console.log(err));
   }

   handleSubtotalSubmit = event => {
     event.preventDefault();
     this.setState({subtotal: true});
   }

   handleRestartSubmit = event => {
     event.preventDefault();
     this.setState({subtotal: false});
   }

   handleNewSubmit = event => {
     event.preventDefault();
     this.setState({subtotal: false, inputForm: false});
     this.setState({selectedBakery: "", dateOfPickup: "", valueSize: "", valueFlavor: "", valueOutside: "", valueInside: "", 
     writingOnCake: "", decorations: "", cookieQuantity: "", cupcakeQuantity: ""})
   }

   loadPreviousOrders = (currentCustomerID) => {
     API.getOrders()
     .then(res => {
       const orders = res.data;
       const previousCustomerOrders = orders.filter(order => order.customerID === currentCustomerID);
       previousCustomerOrders.sort((a,b) => a.dueDate - b.dueDate);
       previousCustomerOrders.map(order => {
         const findBakeryName = this.state.databaseBakeries.filter(bakery => bakery._id === order.bakeryID);
         order.name = findBakeryName[0].name;
       })
       this.setState({previousOrders: previousCustomerOrders})
     })
     .catch(err => console.log(err));
   }


   render() {
    const authorization = sessionStorage.getItem("registered");
    if (authorization !== "customer"){
      window.location.replace("/signup-customer")
    }
    else {   
       return (
         <div>
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
    <div className="carousel-wrapper">
            <Carousel infiniteLoop autoPlay showThumbs="false">
                <div>
                    <img src={require("../images/photo1.jpg")} />
                </div>
                <div>
                    <img src={require("../images/photo2.jpg")} />
                </div>
                <div>
                    <img src={require("../images/photo3.jpg")} />
                </div>
                <div>
                    <img src={require("../images/piece-of-cake-with-berries-on-top-1639564.jpg")} />
                </div>
                <div>
                    <img src={require("../images/photo5.jpg")} />
                </div>
               
            </Carousel>
        </div>  
    
  
           <div className="container-fluid">
             <p>Greetings {this.state.customer.name}!</p>
             <p>Submit a bakery order and view any previous orders below.</p>

             <div className="order">
             <h1>Customer Order</h1>
             <br></br>
             {!this.state.inputForm ? (
             !this.state.subtotal ? (
               <form>
               <select className="form-control" 
                 value={this.state.selectedBakery}
                 onChange={this.handleInputChange}
                 name="selectedBakery"              
               ><option>- Select bakery -</option>
                 {this.state.bakeryNames.map(name => <option>{name}</option>)}</select>
               <br></br>
               <Input
                 value={this.state.dateOfPickup}
                 onChange={this.handleInputChange}
                 name="dateOfPickup"
                 placeholder="Date of Pickup"
               />
               <p>Cake Flavor</p>
               <select className="form-control" name="valueFlavor" onChange ={this.handleInputChange} value={this.state.valueFlavor}>
                   <option>- Select flavor -</option>
                   <option value ="Vanilla">Vanilla</option>
                   <option value ="Chocolate">Chocolate</option>
                   <option value ="Carrot">Carrot</option>
                   <option value ="Red Velvet">Red Velvet</option>
               </select>
               <p>Cake Size</p>
               <select className="form-control" name="valueSize" onChange ={this.handleInputChange} value={this.state.valueSize}>
                   <option>- Select size -</option>
                   <option value ="6 inch">6 inch</option>
                   <option value ="9 inch">9 inch</option>
                   <option value ="12 inch">12 inch</option>
                   <option value ="14 inch">14 inch</option>
                   <option value ="1/4 Sheet">1/4 Sheet</option>
                   <option value ="1/2 Sheet">1/2 Sheet</option>
               </select>
               <p>Buttercream Outside</p>
               <select className="form-control" name="valueOutside" onChange ={this.handleInputChange} value={this.state.valueOutside}>
                   <option>- Select buttercream outside -</option>
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
               <p>Buttercream Inside</p>
               <select className="form-control" name="valueInside" onChange ={this.handleInputChange} value={this.state.valueInside}>
                   <option>- Select buttercream inside -</option>
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
                 placeholder="How many cookies would you like?"
               />
                 <Input
                 value={this.state.cupcakeQuantity}
                 onChange={this.handleInputChange}
                 name="cupcakeQuantity"
                 placeholder="How many cupcakes would you like?"
               />
               <FormBtn className="orderButton"
                 onClick={this.handleSubtotalSubmit}
               >
                 Enter Order Details
               </FormBtn>
               </form>
             ) : (
               <div>
                 <p>Order Details</p>
                 <p>Bakery Selection: {this.state.selectedBakery ? this.state.selectedBakery : "No selection"}</p>
                 <p>Date of Pickup: {this.state.dateOfPickup ? this.state.dateOfPickup : "No date entered"}</p>
                 <p>Cake Flavor: {this.state.valueFlavor ? this.state.valueFlavor : "No selection"}</p>
                 <p>Cake Size: {this.state.valueSize ? this.state.valueSize : "No selection"}</p>
                 <p>Buttercream Outside: {this.state.valueOutside ? this.state.valueOutside : "No selection"}</p>
                 <p>Buttercream Inside: {this.state.valueInside ? this.state.valueInside: "No selection"}</p>
                 <p>Writing On Cake: {this.state.writingOnCake ? this.state.writingOnCake : "No writing entered"}</p>
                 <p>Decoration(s): {this.state.decorations ? this.state.decorations : "No decorations entered"}</p>
                 <p>Cookie Quantity: {this.state.cookieQuantity ? this.state.cookieQuantity : "No quantity entered"}</p>
                 <p>Cupcake Quantity: {this.state.cupcakeQuantity ? this.state.cupcakeQuantity : "No quantity entered"}</p>
               <FormBtn
                 onClick={this.handleFormSubmit}
               >
                 Submit Order
               </FormBtn>
               <FormBtn
                 onClick={this.handleRestartSubmit}
               >
                 Change Order Details
               </FormBtn>
               </div>
             )) : (
               <div>
                 <p>Thank you! Order submitted! Select new order to create another order.</p>
               <FormBtn
                 onClick={this.handleNewSubmit}
               >
                 New Order
               </FormBtn>
               </div>
             )}
             </div>
             <div className="map">
               <img alt="map" src={this.state.map} />
               <p>{this.state.mapMessage}</p>
             </div>
             <List>
               {this.state.previousOrders.map(order => (
                   <ListItem key={order._id}>
                       <p>Date of Pickup: {order.dueDate ? order.dueDate : "N/A"}</p>
                       <p>Bakery Name: {order.name ? order.name : "N/A"}</p>
                       <p>Bakery Order ID: {order.bakeryOrderID ? order.bakeryOrderID : "N/A"}</p>
                       <p>Cake size: {order.size ? order.size : "N/A"}</p>
                       <p>Cake flavor: {order.flavor ? order.flavor : "N/A"}</p>
                       <p>Buttercream inside: {order.buttercreamInside ? order.buttercreamOutside : "N/A"}</p>
                       <p>Buttercream outside: {order.buttercreamOutside ? order.buttercreamOutside : "N/A"}</p>
                       <p>Writing: {order.writing ? order.writing : "N/A"}</p>
                       <p>Decorations: {order.decorations ? order.decorations : "N/A"}</p>
                       <p>Order submitted by: {order.orderSubmittedBy ? order.orderSubmittedBy : "N/A"}</p>
                       <p>Cookies quantity: {order.cookiesQuantity ? order.cookiesQuantity : "N/A"}</p>
                       <p>Cupcakes quantity: {order.cupcakesQuantity ? order.cupcakesQuantity : "N/A"}</p>
                       <p>Status: {order.status ? order.status : "N/A"}</p>
                   </ListItem>
               ))}
           </List>
           </div>
           <Footer></Footer>
           </div>
       )
   }
  }
 }


export default Customer;