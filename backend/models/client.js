const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    phone: String,
    email: String,
    name: String,
    gymName: String
});

module.exports = mongoose.model("Client", clientSchema);