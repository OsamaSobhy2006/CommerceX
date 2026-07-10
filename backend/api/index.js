const app = require("../app");
const connectDB = require("../config/connectDB");

connectDB();

module.exports = app;