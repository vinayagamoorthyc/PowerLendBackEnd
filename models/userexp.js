const mongoose = require("mongoose");

const UserexpSchema = new mongoose.Schema({
    name: String,
    experience: String
});

const UserexpModel = mongoose.model("userexp", UserexpSchema);
module.exports = UserexpModel;