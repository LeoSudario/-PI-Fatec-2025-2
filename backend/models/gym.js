const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    capacity: { type: Number, default: 0 },
    occupancy: { type: Number, default: 0 }
});

module.exports = mongoose.model("Gym", gymSchema);