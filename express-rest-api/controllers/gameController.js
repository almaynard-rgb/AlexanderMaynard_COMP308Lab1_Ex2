//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1


// controllers/gameController.js
const Game = require('../models/game');

//retun detailed information of the games
const getGames = async (req, res) => {
  try {
    const games = await Game.find(); //find all games
    return res.json(games); //return the games
  } catch (error) { //catch 
    return res.status(500).send('Error fetching games'); //send error message and status
  }
};

//add a game to the database
const addGame = async (req, res) => {
  try {
    const newGame = new Game(req.body); //create a new game
    await newGame.save(); //save the new game
    return res.send('Game added!'); //send message
  } catch (error) { //catch
    return res.status(400).send('Error adding game'); //send error message and status
  }
};

//export the functions
module.exports = {
  getGames,
  addGame,
};