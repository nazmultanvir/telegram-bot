
const mongoose = require("mongoose");

const BetListSchema = mongoose.Schema({
  betListId : Number, 
  betId : Number, 
  betListCurrencyOne : String,
  betListCurrencyTwo : String, 
  betListDate : Date 
});

module.exports = mongoose.model("BetList", BetListSchema);