const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;
const connect = async () => {
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log(`${error} there was a error while connecting to the mongoDB`);
  }
};
module.exports = connect;
