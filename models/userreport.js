const mongoose = require("mongoose");

const UserreportSchema = new mongoose.Schema({
    repname: String,
    report: String
});

const UserreportModel = mongoose.model("userreports", UserreportSchema);
module.exports = UserreportModel;