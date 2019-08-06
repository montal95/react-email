const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

//will create collection if it doesn't already exist
mongoose.model('users', userSchema);