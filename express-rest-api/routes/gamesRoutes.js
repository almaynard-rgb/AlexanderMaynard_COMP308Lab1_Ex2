//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//routes/gamesRoutes.js

//set up the express router
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js'); //import the game controller

//set up the routes
router.get('/api/get_games', gameController.getGames);

module.exports = router; //export the router