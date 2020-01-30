import React, { Component } from "react";
import Plot from 'react-plotly.js';
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import Footer from "../components/Footer";

class Inventory extends Component {
    state = {
        dataVanilla: [
            {
            x: ['Cake 6"', 'Cake 9"', 'Cake 12"', 'Cake 14"', 'Cake 1/4 Sheet', 'Cake 1/2 Sheet', 'Tiered'],
            y: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            }
        ],
        dataChocolate: [
            {
            x: ['Cake 6"', 'Cake 9"', 'Cake 12"', 'Cake 14"', 'Cake 1/4 Sheet', 'Cake 1/2 Sheet', 'Tiered'],
            y: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            },
        ],
        dataCarrot: [
            {
            x: ['Cake 6"', 'Cake 9"', 'Cake 12"', 'Cake 14"', 'Cake 1/4 Sheet', 'Cake 1/2 Sheet', 'Tiered'],
            y: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            },
        ],
        dataRed: [
            {
            x: ['Cake 6"', 'Cake 9"', 'Cake 12"', 'Cake 14"', 'Cake 1/4 Sheet', 'Cake 1/2 Sheet', 'Tiered'],
            y: [0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            },
        ],
        dataOther: [
            {
            x: ['Cookies', 'Cupcakes'],
            y: [0, 0],
            type: 'bar',
            },
        ],
        currentBakeryID: "",
        inventory: [],
        flavor: "",
        size: "",
        other: "",
        selectedID: "",
        selectedQuantity: "No item selected",
        selectedPrice: "No item selected",
        selectionUpdate: "No item selected",
        quantity: "",
        unitPrice: "",
        cake_update: "",
        cookies_update: "",
        cupcakes_update: "",
        sizeNew: "",
        flavorNew: "",
        quantityCake: "",
        unitPriceCake: "",
        otherNew: "",
        quantityOther: "",
        unitPriceOther: "",
        inventoryMessage: "No messages"
    };

    componentDidMount() {
        const currentUser = sessionStorage.getItem("username");
        API.getBakeries()
        .then(res => {
            const bakeryInfo = res.data.filter(data => data.username === currentUser);
            const currentBakeryID = bakeryInfo[0]._id;
            this.setState({currentBakeryID: currentBakeryID})
            this.loadPlots();
        })
        .catch(err => console.log(err));
    }

    loadPlots = () => {
        API.getInventories()
        .then(res => {
            const bakeryInventory = res.data.filter(data => data.bakeryID === this.state.currentBakeryID);
            let cake6_vanilla = 0;
            let cake9_vanilla = 0;
            let cake12_vanilla = 0;
            let cake14_vanilla = 0;
            let quarter_vanilla = 0;
            let half_vanilla = 0;
            let tiered_vanilla = 0;
            let cake6_chocolate = 0;
            let cake9_chocolate = 0;
            let cake12_chocolate = 0;
            let cake14_chocolate = 0;
            let quarter_chocolate = 0;
            let half_chocolate = 0;
            let tiered_chocolate = 0;
            let cake6_carrot = 0;
            let cake9_carrot = 0;
            let cake12_carrot = 0;
            let cake14_carrot = 0;
            let quarter_carrot = 0;
            let half_carrot = 0;
            let tiered_carrot = 0;
            let cake6_red = 0;
            let cake9_red = 0;
            let cake12_red = 0;
            let cake14_red = 0;
            let quarter_red = 0;
            let half_red = 0;
            let tiered_red = 0;
            let cookiesQuantity = 0;
            let cupcakesQuantity = 0;
            bakeryInventory.forEach(inventory => {
                if (inventory.flavor === "vanilla" && inventory.size === "cake6"){
                    cake6_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "vanilla" && inventory.size === "cake9"){
                    cake9_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "vanilla" && inventory.size === "cake12"){
                    cake12_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "vanilla" && inventory.size === "cake14"){
                    cake14_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "vanilla" && inventory.size === "cakeQuarter"){
                    quarter_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "vanilla" && inventory.size === "cakeHalf"){
                    half_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "vanilla" && inventory.size === "cakeTiered"){
                    tiered_vanilla = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cake6"){
                    cake6_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cake9"){
                    cake9_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cake12"){
                    cake12_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cake14"){
                    cake14_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cakeQuarter"){
                    quarter_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cakeHalf"){
                    half_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "chocolate" && inventory.size === "cakeTiered"){
                    tiered_chocolate = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cake6"){
                    cake6_carrot = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cake9"){
                    cake9_carrot = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cake12"){
                    cake12_carrot = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cake14"){
                    cake14_carrot = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cakeQuarter"){
                    quarter_carrot = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cakeHalf"){
                    half_carrot = inventory.quantity;
                }
                if (inventory.flavor === "carrot" && inventory.size === "cakeTiered"){
                    tiered_carrot = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cake6"){
                    cake6_red = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cake9"){
                    cake9_red = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cake12"){
                    cake12_red = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cake14"){
                    cake14_red = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cakeQuarter"){
                    quarter_red = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cakeHalf"){
                    half_red = inventory.quantity;
                }
                if (inventory.flavor === "red" && inventory.size === "cakeTiered"){
                    tiered_red = inventory.quantity;
                }
                if (inventory.cookies){
                    cookiesQuantity = inventory.cookies_quantity;
                }
                if (inventory.cupcakes){
                    cupcakesQuantity = inventory.cupcakes_quantity;
                }
            })
            this.setState({ dataVanilla: [{...this.state.dataVanilla[0], 
                y: [cake6_vanilla, cake9_vanilla, cake12_vanilla, cake14_vanilla, quarter_vanilla, half_vanilla, tiered_vanilla]
            }]})
            this.setState({ dataChocolate: [{...this.state.dataChocolate[0], 
                y: [cake6_chocolate, cake9_chocolate, cake12_chocolate, cake14_chocolate, quarter_chocolate, half_chocolate, tiered_chocolate]
            }]})
            this.setState({ dataCarrot: [{...this.state.dataCarrot[0], 
                y: [cake6_carrot, cake9_carrot, cake12_carrot, cake14_carrot, quarter_carrot, half_carrot, tiered_carrot]
            }]})
            this.setState({ dataRed: [{...this.state.dataRed[0], 
                y: [cake6_red, cake9_red, cake12_red, cake14_red, quarter_red, half_red, tiered_red]
            }]})
            this.setState({ dataOther: [{...this.state.dataOther[0], 
                y: [cookiesQuantity, cupcakesQuantity]
            }]})
            this.setState({ inventory: bakeryInventory })
        })
        .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSelectionSubmit = event => {
        event.preventDefault();
        this.setState({inventoryMessage: "No messages"});
        let inventorySearch = false;
        let selection = "";
        this.state.inventory.forEach(item => {
            if (item.size === this.state.size && item.flavor === this.state.flavor){
                this.setState({selectedID: item._id})
                this.setState({selectedQuantity: item.quantity})
                this.setState({selectedPrice: item.unitPrice})
                this.setState({cake_update: "yes"})
                this.setState({cookies_update: ""})
                this.setState({cupcakes_update: ""})
                selection = this.state.flavor + " " + this.state.size;
                this.setState({selectionUpdate: selection})
                inventorySearch = true;
            }
        })
        if (this.state.other === "cookies"){
            const selectedOther = this.state.inventory.filter(item => item.cookies === "yes")
            this.setState({selectedID: selectedOther[0]._id})
            this.setState({selectedQuantity: selectedOther[0].cookies_quantity})
            this.setState({selectedPrice: selectedOther[0].unitPrice})
            this.setState({cake_update: ""})
            this.setState({cookies_update: "yes"})
            this.setState({cupcakes_update: ""})
            this.setState({selectionUpdate: this.state.other})
            inventorySearch = true;
        }
        if (this.state.other === "cupcakes"){
            const selectedOther2 = this.state.inventory.filter(item => item.cupcakes === "yes")
            this.setState({selectedID: selectedOther2[0]._id})
            this.setState({selectedQuantity: selectedOther2[0].cupcakes_quantity})
            this.setState({selectedPrice: selectedOther2[0].unitPrice})  
            this.setState({cake_update: ""})
            this.setState({cookies_update: ""})
            this.setState({cupcakes_update: "yes"})
            this.setState({selectionUpdate: this.state.other})
            inventorySearch = true;   
        }
        if (!inventorySearch){
            this.setState({selectedQuantity: "No match", selectedPrice: "No match"})
        }
    }

    handleQuantitySubmit = event => {
        event.preventDefault();
        this.setState({inventoryMessage: ""});
        if (this.state.cake_update === "yes"){
            API.updateInventory(this.state.selectedID, 
                { quantity: this.state.quantity }
            )
            .then(res => this.loadPlots())
            .catch(err => console.log(err));
            this.setState({inventoryMessage: "Item quantity updated!"});
            this.setState({size: "", flavor: ""});
            this.setState({quantity: "", selectionUpdate: "No item selected", selectedQuantity: "No item selected", selectedPrice: "No item selected"});
        }
        if (this.state.cookies_update === "yes"){
            API.updateInventory(this.state.selectedID, 
                { cookies_quantity: this.state.quantity }
            )
            .then(res => this.loadPlots())
            .catch(err => console.log(err));
            this.setState({inventoryMessage: "Item quantity updated!"});
            this.setState({other: ""});
            this.setState({quantity: "", selectionUpdate: "No item selected", selectedQuantity: "No item selected", selectedPrice: "No item selected"});
        }
        if (this.state.cupcakes_update === "yes"){
            API.updateInventory(this.state.selectedID, 
                { cupcakes_quantity: this.state.quantity }
            )
            .then(res => this.loadPlots())
            .catch(err => console.log(err));
            this.setState({inventoryMessage: "Item quantity updated!"});
            this.setState({other: ""});
            this.setState({quantity: "", selectionUpdate: "No item selected", selectedQuantity: "No item selected", selectedPrice: "No item selected"});
        }
    }

    handlePriceSubmit = event => {
        event.preventDefault();
        this.setState({inventoryMessage: ""});
        API.updateInventory(this.state.selectedID, 
            { unitPrice: this.state.unitPrice }
        )
        .then(res => this.loadPlots())
        .catch(err => console.log(err));
        this.setState({inventoryMessage: "Item price updated!"});
        this.setState({size: "", flavor: "", other: ""});
        this.setState({unitPrice: ""});
    }

    handleNewSubmit = event => {
        event.preventDefault();
        let alreadyExists = false;
        this.setState({inventoryMessage: ""});
        this.state.inventory.forEach(item => {
            if (this.state.flavorNew === item.flavor && this.state.sizeNew === item.size){
                alreadyExists = true;
                this.setState({flavorNew: "", sizeNew: "", quantityCake: "", unitPriceCake: "", otherNew: "", quanityOther: "", unitPriceOther: ""});
                this.setState({inventoryMessage: "Item already exists, use update fields to change inventory!"});
            }
        })
        if (this.state.otherNew === "cookies"){
            const selectedNew = this.state.inventory.filter(item => item.cookies === "yes")
            if (selectedNew){
                alreadyExists = true;
                this.setState({flavorNew: "", sizeNew: "", quantityCake: "", unitPriceCake: "", otherNew: "", quanityOther: "", unitPriceOther: ""});
                this.setState({inventoryMessage: "Item already exists, use update fields to change inventory!"});            }
        }
        if (this.state.otherNew === "cupcakes"){
            const selectedNew = this.state.inventory.filter(item => item.cupcakes === "yes")
            if (selectedNew){
                alreadyExists = true;
                this.setState({flavorNew: "", sizeNew: "", quantityCake: "", unitPriceCake: "", otherNew: "", quanityOther: "", unitPriceOther: ""});
                this.setState({inventoryMessage: "Item already exists, use update fields to change inventory!"});            }
        }
        if (!alreadyExists){
            if (this.state.flavorNew && this.state.sizeNew && this.state.quantityCake && this.state.unitPriceCake){
                API.saveInventory({
                    size: this.state.sizeNew,
                    flavor: this.state.flavorNew,
                    quantity: this.state.quantityCake,
                    unitPrice: this.state.unitPriceCake,
                    bakeryID: this.state.currentBakeryID
                })
                .then(res => this.loadPlots())
                .catch(err => console.log(err));
                this.setState({flavorNew: "", sizeNew: "", quantityCake: "", unitPriceCake: ""});
                this.setState({inventoryMessage: "Item added to inventory database for the first time!"});   
            }
            else if (this.state.otherNew && this.state.quantityOther && this.state.unitPriceOther){
                if (this.state.otherNew === "cookies"){
                    API.saveInventory({
                        unitPrice: this.state.unitPriceOther,
                        bakeryID: this.state.currentBakeryID,
                        cookies: "yes",
                        cookies_quantity: this.state.quantityOther
                    })
                    .then(res => this.loadPlots())
                    .catch(err => console.log(err));
                    this.setState({unitPriceOther: "", quantityOther: ""});
                    this.setState({inventoryMessage: "Item added to inventory database for the first time!"});   
                }
                if (this.state.otherNew === "cupcakes"){
                    API.saveInventory({
                        unitPrice: this.state.unitPriceOther,
                        bakeryID: this.state.currentBakeryID,
                        cupcakes: "yes",
                        cupcakes_quantity: this.state.quantityOther
                    })
                    .then(res => this.loadPlots())
                    .catch(err => console.log(err));
                    this.setState({unitPriceOther: "", quantityOther: ""});
                    this.setState({inventoryMessage: "Item added to inventory database for the first time!"});   
                }
            }
            else {
                this.setState({inventoryMessage: "Incomplete new submittal, try again!"});   
            }
        }
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
      <a class="nav-item nav-link" onClick={this.handleLogOut}>Log Out</a>
    </div>
  </div>
</nav>
</div>
    <div className="container-fluid">
        <div className="inventoryPlots" style = {{width: "100%", height: "300px"}}>
            <Plot
            data={this.state.dataVanilla}
            style = {{width: "100%", height: "100%"}}
            layout={ {title: 'Vanilla Cake Inventory Plot'} }
            config={ {displayModeBar: false} }
            useResizeHandler
            />
        </div>
        <div className="inventoryPlots" style = {{width: "100%", height: "300px"}}>
            <Plot
            data={this.state.dataChocolate}
            style = {{width: "100%", height: "100%"}}
            layout={ {title: 'Chocolate Cake Inventory Plot'} }
            config={ {displayModeBar: false} }
            useResizeHandler
            />
        </div>
        <div className="inventoryPlots" style = {{width: "100%", height: "300px"}}>
            <Plot
            data={this.state.dataCarrot}
            style = {{width: "100%", height: "100%"}}
            layout={ {title: 'Carrot Cake Inventory Plot'} }
            config={ {displayModeBar: false} }
            useResizeHandler
            />
        </div>
        <div className="inventoryPlots" style = {{width: "100%", height: "300px"}}>
            <Plot
            data={this.state.dataRed}
            style = {{width: "100%", height: "100%"}}
            layout={ {title: 'Red Velvet Cake Inventory Plot'} }
            config={ {displayModeBar: false} }
            useResizeHandler
            />
        </div>
        <div className="inventoryPlots" style = {{width: "100%", height: "300px"}}>
            <Plot
            data={this.state.dataOther}
            style = {{width: "100%", height: "100%"}}
            layout={ {title: 'Other Inventory Plot'} }
            config={ {displayModeBar: false} }
            useResizeHandler
            />
        </div>
        <form>
            <p>Select cake</p>
            <select className="form-control" 
                value={this.state.flavor}
                onChange={this.handleInputChange}
                name="flavor"
                >
                <option value="" disabled selected>- Select flavor -</option>
                <option value ="vanilla">Vanilla</option>
                <option value ="chocolate">Chocolate</option>
                <option value ="carrot">Carrot</option>
                <option value ="red">Red Velvet</option>
            </select>
            <select className="form-control" 
                value={this.state.size}
                onChange={this.handleInputChange}
                name="size"
                >
                <option value="" disabled selected>- Select size -</option>
                <option value ="cake6">6 inch</option>
                <option value ="cake9">9 inch</option>
                <option value ="cake12">12 inch</option>
                <option value ="cake14">14 inch</option>
                <option value ="cakeQuarter">1/4 Sheet</option>
                <option value ="cakeHalf">1/2 Sheet</option>
                <option value ="cakeTiered">Tiered</option>
            </select>
            <p>or</p>
            <select className="form-control"
                value={this.state.other}
                onChange={this.handleInputChange}
                name="other"
                >
                <option value="" disabled selected>- Select other inventory item -</option>
                <option value ="cookies">Cookies</option>
                <option value ="cupcakes">Cupcakes</option>
            </select>
            <FormBtn
                onClick={this.handleSelectionSubmit}
            >
            Select Inventory to Update
            </FormBtn>
        </form>
        <div>
            <p>Current Selection Information</p>
            <p>Current Quantity: {this.state.selectedQuantity}</p>
            <p>Current Unit Price ($): {this.state.selectedPrice}</p>
        </div>
        <form>
            <Input
                value={this.state.quantity}
                onChange={this.handleInputChange}
                name="quantity"
                placeholder="Quantity"
            />
            <FormBtn
                onClick={this.handleQuantitySubmit}
            >
                Update Quantity
            </FormBtn>
        </form>
        <form>
            <Input
                value={this.state.unitPrice}
                onChange={this.handleInputChange}
                name="unitPrice"
                placeholder="Unit Price"
            />
            <FormBtn
                onClick={this.handlePriceSubmit}
            >
                Update Unit Price
            </FormBtn>
        </form>
        <form>
        <p>Add new inventory</p>
        <p>Select cake</p>
            <select className="form-control"
                value={this.state.flavorNew}
                onChange={this.handleInputChange}
                name="flavorNew"
                >                            >
                <option value="" disabled selected>- Select flavor -</option>
                <option value ="vanilla">Vanilla</option>
                <option value ="chocolate">Chocolate</option>
                <option value ="carrot">Carrot</option>
                <option value ="red">Red Velvet</option>
            </select>
            <select className="form-control"
                value={this.state.sizeNew}
                onChange={this.handleInputChange}
                name="sizeNew"
                >
                <option value="" disabled selected>- Select size -</option>
                <option value ="cake6">6 inch</option>
                <option value ="cake9">9 inch</option>
                <option value ="cake12">12 inch</option>
                <option value ="cake14">14 inch</option>
                <option value ="cakeQuarter">1/4 Sheet</option>
                <option value ="cakeHalf">1/2 Sheet</option>
                <option value ="cakeTiered">Tiered</option>
            </select>
            <Input
                value={this.state.quantityCake}
                onChange={this.handleInputChange}
                name="quantityCake"
                placeholder="Cake quantity"
            />
            <Input
                value={this.state.unitPriceCake}
                onChange={this.handleInputChange}
                name="unitPriceCake"
                placeholder="Cake unit price"
            />
            <p>or</p>
            <select className="form-control"
                value={this.state.otherNew}
                onChange={this.handleInputChange}
                name="otherNew"
                >
                <option value="" disabled selected>- Select other inventory item -</option>
                <option value ="cookies">Cookies</option>
                <option value ="cupcakes">Cupcakes</option>
            </select>
            <Input
                value={this.state.quantityOther}
                onChange={this.handleInputChange}
                name="quantityOther"
                placeholder="Other quantity"
            />
            <Input
                value={this.state.unitPriceOther}
                onChange={this.handleInputChange}
                name="unitPriceOther"
                placeholder="Other unit price"
            />
            <FormBtn
                onClick={this.handleNewSubmit}
            >
            Submit New Inventory
            </FormBtn>
        </form>
        <p>Inventory Messages: {this.state.inventoryMessage}</p>
        </div>
        <Footer></Footer>
        </div>
      );
    }
    }
  }

  export default Inventory;
