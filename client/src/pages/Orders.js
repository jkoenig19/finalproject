import React, { Component } from "react";
import Plot from 'react-plotly.js';
import moment from 'moment';
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import './style.css';
import Footer from "../components/Footer";


class Orders extends Component {
    state = {
        data: [{
            type: 'table',
            header: {
            values: [["<b>Date of Pickup</b>"], ["<b>Order Number</b>"],
                       ["<b>Customer</b>"], ["<b>Status</b>"]],
            align: ["left", "center"],
            line: {width: 1, color: '#506784'},
            fill: {color: '#119DFF'},
            font: {family: "Arial", size: 12, color: "white"}
            },
            cells: {
            values: [[""],
            [""],
            [""],
            [""]],
            align: ["left", "center"],
            line: {color: "#506784", width: 1},
            fill: {color: ['#25FEFD', 'white']},
            font: {family: "Arial", size: 11, color: ["#506784"]}
            }
        }],
        currentBakeryOrders: [],
        bakeryOrderNumber: "",
        status: "",
        deleteOrderNumber: ""
    };

    componentDidMount() {
        const currentUser = sessionStorage.getItem("username");
        API.getBakeries()
        .then(res => {
            const bakeryInfo = res.data.filter(data => data.username === currentUser);
            const currentBakeryID = bakeryInfo[0]._id;
            this.loadTable(currentBakeryID);
        })
        .catch(err => console.log(err));
      }

    loadTable = (currentBakeryID) => {
        API.getOrders()
        .then(res => {
            const bakeryOrders = res.data.filter(data => data.bakeryID === currentBakeryID);
            bakeryOrders.forEach(bakery => {
                 bakery.dueDate=Date.parse(bakery.dueDate);
            })
            bakeryOrders.sort((a,b) => a.dueDate - b.dueDate);
            const date = [];
            let convert = "";
            const dueDate = [];
            const orderNumber = [];
            const customer = [];
            const status = [];
            bakeryOrders.forEach(bakery => {
                date.push(bakery.dueDate);
                orderNumber.push(bakery.bakeryOrderID);
                customer.push(bakery.customerID);
                status.push(bakery.status);
            })
            date.forEach(date => {
                convert = moment(date).format("M/D/YY - dddd");
                dueDate.push(convert);
            })
            const customerName = [];
            customer.forEach(customer => {
                API.getCustomer(customer)
                .then(res => {
                    customerName.push(res.data.name);
                    this.setState({ data: [{...this.state.data[0], 
                        cells: {...this.state.data[0].cells,
                            values: [dueDate, orderNumber, customerName, status]
                    }}]})
                })
            })
            bakeryOrders.forEach(order => {
                convert = moment(order.dueDate).format("M/D/YY");
                order.dueDate = convert;
            })
            this.setState({currentBakeryOrders: bakeryOrders});
            console.log(this.state.currentBakeryOrders)
        })
        .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleStatusSubmit = event => {
        event.preventDefault();
        this.state.currentBakeryOrders.forEach(order => {
            if (order.bakeryOrderID === this.state.bakeryOrderNumber){
                API.updateOrder(order._id, 
                    { status: this.state.status }
                )
                .then(res => this.loadTable(order.bakeryID))
                .catch(err => console.log(err));
            }
            this.setState({bakeryOrderNumber: ""});
            this.setState({status: ""});
        })
    }

    handleDeleteSubmit = event => {
        event.preventDefault();
        this.state.currentBakeryOrders.forEach(order => {
            if (order.bakeryOrderID === this.state.deleteOrderNumber){
                API.deleteOrder(order._id)
                .then(res => this.loadTable(order.bakeryID))
                .catch(err => console.log(err))
            }
            this.setState({deleteOrderNumber: ""});
        })
    }

    render() {
        const authorization = sessionStorage.getItem("registered");
        if (authorization !== "bakery"){
          window.location.replace("/signup")
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
    </div>
  </div>
</nav>
</div>         
            <div className="container-fluid">
                <div style = {{width: "100%", height: "300px"}}>
                    <Plot 
                    data={this.state.data}
                    style = {{width: "100%", height: "100%"}}
                    layout={ {title: 'Bakery Orders'} }
                    config={ {displayModeBar: false} }
                    useResizeHandler
                    />
                </div>
                <form>
                    <Input
                        value={this.state.bakeryOrderNumber}
                        onChange={this.handleInputChange}
                        name="bakeryOrderNumber"
                        placeholder="Order number"
                    />
                    <Input
                        value={this.state.status}
                        onChange={this.handleInputChange}
                        name="status"
                        placeholder="Status"
                    />
                    <FormBtn
                        onClick={this.handleStatusSubmit}
                    >
                        Update Status
                    </FormBtn>
                </form>
                <form>
                    <Input
                        value={this.state.deleteOrderNumber}
                        onChange={this.handleInputChange}
                        name="deleteOrderNumber"
                        placeholder="Order number"
                    />
                    <FormBtn
                        onClick={this.handleDeleteSubmit}
                    >
                        Delete Order
                    </FormBtn>
                </form>
            <List>
                {this.state.currentBakeryOrders.map(order => (
                    <ListItem key={order._id}>
                        <p>Date of Pickup: {order.dueDate ? order.dueDate : "N/A"}</p>
                        <p>Order ID: {order.bakeryOrderID ? order.bakeryOrderID : "N/A"}</p>
                        <p>Cake size: {order.size ? order.size : "N/A"}</p>
                        <p>Cake flavor: {order.flavor ? order.flavor : "N/A"}</p>
                        <p>Buttercream inside: {order.buttercreamInside ? order.buttercreamInside : "N/A"}</p>
                        <p>Buttercream outside: {order.buttercreamOutside ? order.buttercreamOutside : "N/A"}</p>
                        <p>Writing: {order.writing ? order.writing : "N/A"}</p>
                        <p>Decorations: {order.decorations ? order.decorations : "N/A"}</p>
                        <p>Order submitted by: {order.orderSubmittedBy ? order.orderSubmittedBy : "N/A"}</p>
                        <p>Cookies quantity: {order.cookiesQuantity ? order.cookiesQuantity : "N/A"}</p>
                        <p>Cupcakes quantity: {order.cupcakesQuantity ? order.cupcakesQuantity : "N/A"}</p>
                    </ListItem>
                ))}
            </List>
            </div>
            <Footer></Footer>
            </div>
            );
          }
        }
        }
      
export default Orders;