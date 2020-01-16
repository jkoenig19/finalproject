const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bakerySchema = new Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  location: { type: String }
});

const Bakery = mongoose.model("Bakery", bakerySchema);

module.exports = Bakery;
