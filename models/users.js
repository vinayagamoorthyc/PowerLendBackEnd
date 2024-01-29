const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: Number,
    address: {
        type: String,
        default: "Update your profile to set the delivery address and the address should be valid with pincode!"
    },
    orders: {
        type: Number,
        default: 0,
    },
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;