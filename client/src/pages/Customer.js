 import React , { Component } from "react";
 import './style.css';
 import { Input, TextArea, FormBtn, Option, SelectBox} from "../components/Form";
 
 

 class Customer extends Component {
    state = {
      customerName:"",
      dateOfPickup: "",
      writingOnCake: "",
      decorations: "",
      cookieQuantity:"",
      cupcakeQuantity:""
    };

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
 <SelectBox onChange ={this.handleChange} value={this.state.value}>
     <Option value ="vanilla">Vanilla</Option>
     <Option value ="chocolate">Chocolate</Option>
     <Option value ="carrot">Carrot</Option>
     <Option value ="redVelvet">Red Velvet</Option>
   </SelectBox>
 <p>Cake Size</p>
 <SelectBox onChange ={this.handleChange} value={this.state.value}>
     <Option value ="6inch">6 inch</Option>
     <Option value ="9inch">9 inch</Option>
     <Option value ="12inch">12 inch</Option>
     <Option value ="14inch">14 inch</Option>
     <Option value ="fourthsheet">1/4 Sheet</Option>
     <Option value ="halfsheet">1/2 Sheet</Option>
 </SelectBox>
 <p>Butter Cream Outside</p>
 <SelectBox onChange ={this.handleChange} value={this.state.value}>
     <Option value ="vanilla">Vanilla</Option>
     <Option value ="almond">Almond</Option>
     <Option value ="blackberry">Blackberry</Option>
     <Option value ="chocolate">Chocolate</Option>
     <Option value ="mocha">Mocha</Option>
     <Option value ="mint">Mint</Option>
     <Option value ="strawberry">Strawberry</Option>
     <Option value ="caramel">Caramel</Option>
     <Option value ="peanutButter">Peanut Butter</Option>
     <Option value ="raspberry">Reaspberry</Option>
     <Option value ="blueberry">Blueberry</Option>
     <Option value ="creamCheese">Cream Cheese</Option>
     <Option value ="ganache">Ganache</Option>
 </SelectBox>
 <p>Butter Cream Inside</p>
 <SelectBox onChange ={this.handleChange} value={this.state.value}>
     <Option value ="vanilla">Vanilla</Option>
     <Option value ="almond">Almond</Option>
     <Option value ="blackberry">Blackberry</Option>
     <Option value ="chocolate">Chocolate</Option>
     <Option value ="mocha">Mocha</Option>
     <Option value ="mint">Mint</Option>
     <Option value ="strawberry">Strawberry</Option>
     <Option value ="caramel">Caramel</Option>
     <Option value ="peanutButter">Peanut Butter</Option>
     <Option value ="raspberry">Reaspberry</Option>
     <Option value ="blueberry">Blueberry</Option>
     <Option value ="creamCheese">Cream Cheese</Option>
     <Option value ="ganache">Ganache</Option>
 </SelectBox>
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
        )}
 }


 export default Customer;