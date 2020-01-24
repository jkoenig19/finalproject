 import React , { Component } from "react";
 import './style.css';
 import { Input, TextArea, FormBtn } from "../components/Form";
 
 

 class Customer extends Component {
    state = {
      customerName:"",
      dateOfPickup: "",
      writingOnCake: "",
      decorations: "",
      cookieQuantity:"",
      cupcakeQuantity:"",
      valueFlavor: "",
      valueSize: "",
      valueOutside: "",
      valueInside: ""
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    handleFormSubmit = event => {
      event.preventDefault();
    }

    render() {
        return (
            <div className= "container-fluid">
              <form>
              <Input
                value={this.state.customerName}
                onChange={this.handleInputChange}
                name="customerName"
                placeholder="Name"
              />
              <Input
                value={this.state.dateOfPickup}
                onChange={this.handleInputChange}
                name="dateOfPickup"
                placeholder="Date of Pickup"
              />
              <p>Cake Flavor</p>
              <select className="form-control" name="valueFlavor" onChange ={this.handleInputChange} value={this.state.valueFlavor}>
                  <option value ="vanilla">Vanilla</option>
                  <option value ="chocolate">Chocolate</option>
                  <option value ="carrot">Carrot</option>
                  <option value ="redVelvet">Red Velvet</option>
              </select>
              <p>Cake Size</p>
              <select className="form-control" name="valueSize" onChange ={this.handleInputChange} value={this.state.valueSize}>
                  <option value ="6inch">6 inch</option>
                  <option value ="9inch">9 inch</option>
                  <option value ="12inch">12 inch</option>
                  <option value ="14inch">14 inch</option>
                  <option value ="fourthsheet">1/4 Sheet</option>
                  <option value ="halfsheet">1/2 Sheet</option>
              </select>
              <p>Butter Cream Outside</p>
              <select className="form-control" name="valueOutside" onChange ={this.handleInputChange} value={this.state.valueOutside}>
                  <option value ="vanilla">Vanilla</option>
                  <option value ="almond">Almond</option>
                  <option value ="blackberry">Blackberry</option>
                  <option value ="chocolate">Chocolate</option>
                  <option value ="mocha">Mocha</option>
                  <option value ="mint">Mint</option>
                  <option value ="strawberry">Strawberry</option>
                  <option value ="caramel">Caramel</option>
                  <option value ="peanutButter">Peanut Butter</option>
                  <option value ="raspberry">Reaspberry</option>
                  <option value ="blueberry">Blueberry</option>
                  <option value ="creamCheese">Cream Cheese</option>
                  <option value ="ganache">Ganache</option>
              </select>
              <p>Butter Cream Inside</p>
              <select className="form-control" name="valueInside" onChange ={this.handleInputChange} value={this.state.valueInside}>
                  <option value ="vanilla">Vanilla</option>
                  <option value ="almond">Almond</option>
                  <option value ="blackberry">Blackberry</option>
                  <option value ="chocolate">Chocolate</option>
                  <option value ="mocha">Mocha</option>
                  <option value ="mint">Mint</option>
                  <option value ="strawberry">Strawberry</option>
                  <option value ="caramel">Caramel</option>
                  <option value ="peanutButter">Peanut Butter</option>
                  <option value ="raspberry">Reaspberry</option>
                  <option value ="blueberry">Blueberry</option>
                  <option value ="creamCheese">Cream Cheese</option>
                  <option value ="ganache">Ganache</option>
              </select>
              <TextArea
                value={this.state.writingOnCake}
                onChange={this.handleInputChange}
                name="writingOnCake"
                placeholder=""
              />
                <TextArea
                value={this.state.decorations}
                onChange={this.handleInputChange}
                name="decorations"
                placeholder="decoration"
              />
                <Input
                value={this.state.cookieQuantity}
                onChange={this.handleInputChange}
                name="cookieQuantity"
                placeholder="How many cookies would you like"
              />
                <Input
                value={this.state.cupcakeQuantity}
                onChange={this.handleInputChange}
                name="cupcakeQuantity"
                placeholder="How many cupcakes would you like"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Submit Order
              </FormBtn>
              </form>
            </div>
        )
    }
  }


 export default Customer;