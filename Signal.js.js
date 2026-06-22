const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
  pair: String,
  type: String,
  entry: Number,
  tp: Number,
  sl: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Signal", signalSchema);