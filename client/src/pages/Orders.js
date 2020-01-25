import React, { Component } from "react";
import Plot from 'react-plotly.js';
import moment from 'moment';
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import API from "../utils/API";


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
                convert = moment(date).format("MM/D/YY - dddd");
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
            this.setState({currentBakeryOrders: bakeryOrders});
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
        return (
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
                        <p>Date of Pickup: {order.dueDate}</p>
                        <p>Order ID: {order.bakeryOrderID}</p>
                        <p>Cake size: {order.size}</p>
                        <p>Cake flavor: {order.flavor}</p>
                        <p>Buttercream inside: {order.buttercreamInside}</p>
                        <p>Buttercream outside: {order.buttercreamOutside}</p>
                        <p>Writing: {order.writing}</p>
                        <p>Decorations: {order.decorations}</p>
                        <p>Order submitted by: {order.orderSubmittedBy}</p>
                        <p>Cookies quantity: {order.cookies_quantity}</p>
                        <p>Cupcakes quantity: {order.cupcakes_quantity}</p>
                    </ListItem>
                ))}
            </List>
            </div>
            );
          }
        }
      
export default Orders;