//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//routes/userRoutes.js


//set up the express router
const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/userController.js'); //import the user controller

// set up the routes
router.post('/api/login', userController.loginUser);
router.post('/api/register', userController.registerUser);
router.get('/api/logout', userController.logoutUser);
router.post('/api/get_user_games', userController.getUsersGames);
router.post('/api/add_games', userController.addGameToUserCollection);
router.get('/api/sign_in_cookie', userController.isSignedIn);
router.delete('/api/remove_user_game/:username/:gameId', userController.removeUserGame);

module.exports = router; //export the router