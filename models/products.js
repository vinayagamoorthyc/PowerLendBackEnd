const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    proname: String,
    prorate: Number,
    desc: String,
    overview: String,
    avail: Number,
    category: String,
    imgurl: String
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;