const mongoose = require("mongoose");

const PointHistory = mongoose.Schema({
  chatId : Number, //user quique ID
  betId : Number,  // Bet Group
  points : Number,
  ChangePoint : Number, //Currency Pair Value 
  modificationTime : Date, // winning Reward point about 
});

module.exports = mongoose.model("PointHistory", PointHistory);