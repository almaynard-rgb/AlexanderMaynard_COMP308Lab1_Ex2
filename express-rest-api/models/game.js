//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

// models/game.js

//get the mongoose module
const mongoose = require('mongoose');

//define the game schema
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//create the Game model from the game schema
const Game = mongoose.model('Game', gameSchema);

module.exports = Game; //export the Game model