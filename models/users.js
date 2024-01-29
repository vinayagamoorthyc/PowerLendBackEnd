const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: Number,
    address: String,
    orders: Number,
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;