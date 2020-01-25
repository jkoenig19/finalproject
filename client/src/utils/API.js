import axios from "axios";

export default {
//Bakeries
  getBakeries: function() {
    return axios.get("/api/bakeries");
  },
  getBakery: function(id) {
    return axios.get("/api/bakeries/" + id);
  },
  deleteBakery: function(id) {
    return axios.delete("/api/bakeries/" + id);
  },
  saveBakery: function(bakeryData) {
    return axios.post("/api/bakeries", bakeryData);
  },
//Customers
  getCustomers: function() {
    return axios.get("/api/customers");
  },
  getCustomer: function(id) {
    return axios.get("/api/customers/" + id);
  },
  deleteCustomer: function(id) {
    return axios.delete("/api/customers/" + id);
  },
  saveCustomer: function(customerData) {
    return axios.post("/api/customers", customerData);
  },
//Inventory
  getInventories: function() {
    return axios.get("/api/inventories");
  },
  getInventory: function(id) {
    return axios.get("/api/inventories/" + id);
  },
  deleteInventory: function(id) {
    return axios.delete("/api/inventories/" + id);
  },
  saveInventory: function(inventoryData) {
    return axios.post("/api/inventories", inventoryData);
  },
  updateInventory: function(id, inventoryData) {
    return axios.put("/api/inventories/" + id, inventoryData);
  },
//Orders
  getOrders: function() {
    return axios.get("/api/orders");
  },
  getOrder: function(id) {
    return axios.get("/api/orders/" + id);
  },
  deleteOrder: function(id) {
    return axios.delete("/api/orders/" + id);
  },
  saveOrder: function(orderData) {
    return axios.post("/api/orders", orderData);
  },
  updateOrder: function(id, orderData) {
    return axios.put("/api/orders/" + id, orderData);
  }
};
