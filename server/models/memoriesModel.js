let mongoose = require("mongoose");
let memorySchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
let Memory = mongoose.model("Memory", memorySchema);
module.exports = Memory;
