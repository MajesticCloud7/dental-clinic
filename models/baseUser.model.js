const mongoose = require("mongoose");

const baseOption = {
  discriminatorKey: "user",
  collection: "users"
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: false,
    required: true
  },
},
  baseOption
);

const User = mongoose.model("User", userSchema);

module.exports = { User };