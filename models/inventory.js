const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  size: { type: String },
  flavor: { type: String },
  quantity: { type: Number },
  unitPrice: { type: Number },
  bakeryID: { type: String },
  cookies: { type: String },
  cupcakes: { type: String }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
