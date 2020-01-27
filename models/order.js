const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  bakeryID: { type: String },
  bakeryOrderID: { type: Number },
  customerID: { type: String },
  orderDate: { type: Date, default: Date.now },
  dueDate: { type: String },
  size: { type: String },
  flavor: { type: String },
  buttercreamInside: { type: String },
  buttercreamOutside: { type: String },
  writing: { type: String },
  decorations: { type: String },
  orderSubmittedBy: { type: String },
  status: { type: String },
  cookies: { type: String },
  cookiesQuantity: { type: Number },
  cupcakes: { type: String },
  cupcakesQuantity: { type: Number },
  cost: { type: Number },
  paid: { type: Boolean },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
