const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});

//will create collection if it doesn't already exist
mongoose.model("users", userSchema);
