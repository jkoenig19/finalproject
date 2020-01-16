const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  location: { type: String }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
