//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

// models/user.js

//get the mongoose module
const mongoose = require('mongoose');
const Game = require('./game');  //import the Game model
 
//define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: Game
  }]
});

//create the User model from the user schema
const User = mongoose.model('User', userSchema);

module.exports = User; //export the User model