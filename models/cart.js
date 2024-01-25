const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    proname: String,
    prorate: Number,
    days: Number,
    imgurl: String
});

const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;