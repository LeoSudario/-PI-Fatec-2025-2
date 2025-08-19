const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/mydatabase", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;