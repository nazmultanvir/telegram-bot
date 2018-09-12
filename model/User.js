
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
  chatId : Number,
  username : String,
  first_name: String,
  last_name: String,
  points : Number,
  language_code: String,
});

module.exports = mongoose.model("User", userSchema);
