const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  address: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  contact: {
    type: String,
    min: 5,
    max: 15,
  },
  password: {
    type: String,
    min: 8,
    max: 1024,
    required: true,
  },
});

module.exports = workerSchema;
