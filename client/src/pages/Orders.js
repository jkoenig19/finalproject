import React, { Component } from "react";
import Plot from 'react-plotly.js';
import moment from 'moment';
import { Input, FormBtn, DeleteBtn } from "../components/Form";
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
                line: { width: 1, color: '#506784' },
                fill: { color: '#0d1852' },
                font: { family: "Arial", size: 16, color: "white" }
            },
            cells: {
                values: [[""],
                [""],
                [""],
                [""]],
                align: ["left", "center"],
                line: { color: "#506784", width: 1 },
                fill: { color: ['#25FEFD', 'white'] },
                font: { family: "Arial", size: 14, color: ["#506784"] }
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
                    bakery.dueDate = Date.parse(bakery.dueDate);
                })
                bakeryOrders.sort((a, b) => a.dueDate - b.dueDate);
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
                            this.setState({
                                data: [{
                                    ...this.state.data[0],
                                    cells: {
                                        ...this.state.data[0].cells,
                                        values: [dueDate, orderNumber, customerName, status]
                                    }
                                }]
                            })
                        })
                })
                bakeryOrders.forEach(order => {
                    convert = moment(order.dueDate).format("M/D/YY");
                    order.dueDate = convert;
                })
                this.setState({ currentBakeryOrders: bakeryOrders });
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
            if (order.bakeryOrderID === this.state.bakeryOrderNumber) {
                API.updateOrder(order._id,
                    { status: this.state.status }
                )
                    .then(res => this.loadTable(order.bakeryID))
                    .catch(err => console.log(err));
            }
            this.setState({ bakeryOrderNumber: "" });
            this.setState({ status: "" });
        })
    }

    handleDeleteSubmit = event => {
        event.preventDefault();
        this.state.currentBakeryOrders.forEach(order => {
            if (order.bakeryOrderID === this.state.deleteOrderNumber) {
                API.deleteOrder(order._id)
                    .then(res => this.loadTable(order.bakeryID))
                    .catch(err => console.log(err))
            }
            this.setState({ deleteOrderNumber: "" });
        })
    }

    handleLogOut = event => {
        event.preventDefault();
        sessionStorage.clear();
        window.location.replace("/")
    }

    render() {
        const authorization = sessionStorage.getItem("registered");
        if (authorization !== "bakery") {
            window.location.replace("/signup-bakery")
        }
        else {
            return (
                <div>
                    <div className="top">
                        <nav class="navbar navbar-expand-lg">
                            <i className="material-icons">cake</i>  <a class="navbar-brand" href="/">Bakery Link</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <a className="nav-item nav-link active" href="/orders">Orders<span class="sr-only">(current)</span></a>
                                    <a className="nav-item nav-link active" href="/inventory">Inventory</a>
                                    <a className="nav-link" onClick={this.handleLogOut}>Log Out</a>
                                </div>
                            </div>
                        </nav>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

                                <div class="navbar-nav">
                                    <a className="nav-link" onClick={this.handleLogOut}>Log Out</a>
                                </div>
                            </div>
                    </div>
                        <div className="container-fluid">
                            <div className="ordersTable" style={{ width: "100%", height: "300px", marginTop: "30px" }}>
                                <Plot
                                    data={this.state.data}
                                    style={{ width: "100%", height: "100%" }}
                                    layout={{ title: 'Bakery Orders' }}
                                    config={{ displayModeBar: false }}
                                    useResizeHandler
                                />
                            </div>
                            <div className="d-flex justify-content-around">
                                <form className="orderStatusUpdate">
                                    <p>Status Updates</p>
                                    <Input
                                        value={this.state.bakeryOrderNumber}
                                        onChange={this.handleInputChange}
                                        name="bakeryOrderNumber"
                                        placeholder="Order number"
                                    />
                                    <select className="form-control"
                                        value={this.state.status}
                                        onChange={this.handleInputChange}
                                        name="status"
                                    >
                                        <option value="" disabled selected>- Select Status -</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="seenbystaff">Seen By Staff</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <FormBtn
                                        onClick={this.handleStatusSubmit}
                                    >
                                        Update Status
                    </FormBtn>
                                </form>
                                <form className="orderDelete">
                                    <p>Delete an Order</p>
                                    <Input
                                        value={this.state.deleteOrderNumber}
                                        onChange={this.handleInputChange}
                                        name="deleteOrderNumber"
                                        placeholder="Order number"
                                    />
                                    <DeleteBtn
                                        onClick={this.handleDeleteSubmit}
                                    >
                                        Delete Order
                    </DeleteBtn>
                                </form>
                            </div>
                            <div className="ordersList">
                                <p className="textOrderForm">List of Orders</p>
                                {this.state.currentBakeryOrders.length ? (
                                    <List>
                                        {this.state.currentBakeryOrders.map(order => (
                                            <ListItem key={order._id}>
                                                <p className="textListItem">Date of Pickup: {order.dueDate ? order.dueDate : "N/A"}</p>
                                                <p className="textListItem">Order ID: {order.bakeryOrderID ? order.bakeryOrderID : "N/A"}</p>
                                                <p className="textListItem">Cake size: {order.size ? order.size : "N/A"}</p>
                                                <p className="textListItem">Cake flavor: {order.flavor ? order.flavor : "N/A"}</p>
                                                <p className="textListItem">Buttercream inside: {order.buttercreamInside ? order.buttercreamInside : "N/A"}</p>
                                                <p className="textListItem">Buttercream outside: {order.buttercreamOutside ? order.buttercreamOutside : "N/A"}</p>
                                                <p className="textListItem">Writing: {order.writing ? order.writing : "N/A"}</p>
                                                <p className="textListItem">Decorations: {order.decorations ? order.decorations : "N/A"}</p>
                                                <p className="textListItem">Order submitted by: {order.orderSubmittedBy ? order.orderSubmittedBy : "N/A"}</p>
                                                <p className="textListItem">Cookies quantity: {order.cookiesQuantity ? order.cookiesQuantity : "N/A"}</p>
                                                <p className="textListItem">Cupcakes quantity: {order.cupcakesQuantity ? order.cupcakesQuantity : "N/A"}</p>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                        <p className="text-secondary">No saved orders to display</p>
                                    )}
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                    );
                }
            }
        }
        
export default Orders;