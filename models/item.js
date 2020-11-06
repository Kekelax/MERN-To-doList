const mongoose = require("mongoose");

//Create schema

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: false,
  },
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
