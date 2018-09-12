const mongoose = require("mongoose");

const betSchema = mongoose.Schema({
  chatId : Number, //user quique ID
  betId : Number,  // Bet Group
  betListId : Number,
  betType : Number,
  betCurrencyValue : Number, //Currency Pair Value 
  betReward : Number, // winning Reward point about 
  betDate : Date //bet date 
});

module.exports = mongoose.model("Bet", betSchema);