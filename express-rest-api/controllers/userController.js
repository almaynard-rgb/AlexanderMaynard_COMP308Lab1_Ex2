//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtExpirySeconds = 31536000; // 31536000 seconds = 1 years
const config = require('../config'); // Adjust the path as necessary
const jwtKey = config.secretKey; // Replace with your actual secret key

// Reference: loginUser is a modified version from the COMP308 course examples
// get a user from the database by username and password and store it in the session cookies
const loginUser = async (req, res) => {
  //get the username and password from the request body
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); //find a user with the username
    //check if the user exists
    if(!user) {
      return res.status(404).send('Invalid user credentials'); //send error message
    }
    //check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    //check if a match is found
    if(!isMatch) {
      return res.status(400).send('Invalid user credentials'); //send error message
    }

    //create a token for the user if the user is found and the password is correct
    const token = jwt.sign({ id: user._id, username: user.username}, jwtKey, 
      {algorithm: 'HS256', expiresIn: jwtExpirySeconds });
    
    //create the cookie named token that stores the token
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true});
    return res.status(200).send({ screen: user.username });
  } catch (error) { //catch any errors
    return res.status(500).send('Error logging in user'); //send error message and status
  }
};

//logout existing user from the session by clearing the cookie
const logoutUser = async (req, res ) => {
  res.clearCookie('token');
  return res.status(200).json({message: "signed out successfully"}); //send message and status
 }


//register a new user to the database
const registerUser = async (req, res) => {
  //const { username, password } = req.body.auth;
  const username = req.body.username;
  const password = req.body.password;
  try {
    //try to find the user in the database
    const existingUser = await User.findOne({ username });
    //check if the user already exists
    if(existingUser) {
      return res.status(400).json({ message: 'User already exists!'}); //if the user exists, send error message
    }

    //encrypt the password using bycrypt library --> Reference: https://www.npmjs.com/package/bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //create a new user with the username and hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); //save the new user to the database

    return res.status(201).send('User added!'); //send message and status of the user being added
  } catch (error) { //catch any errors
    return res.status(400).send('Error registering new user!'); //send error message and status
  }
};

// Reference: this is a modified version from the example given by Github copilot on 2025-02-02 and the COMP308 course examples
//It has been modified to fit the requirements of the assignment
//get the games for a specific user in the user's collection
const getUsersGames = async (req, res) => {
  try {
    const { username } = req.body; //get the username from the request body
    //find one user by username and insert games to for the user into user.games array
    const user = await User.findOne({ username: username }).populate('games'); 
    //check if the user exists
    if (!user) {
      return res.status(404).send('User not found'); //send error message
    }
    //return the games for the user if all goes well
    return res.status(200).json(user.games);
  } catch (error) { //catch any errors
    return res.status(500).send('Error fetching games details'); //send error message and status that the games details could not be fetched
  }
};

// Reference: loginUser is a modified version from the COMP308 course examples --> 2025-02-02
// It has been greatly modified to fit the requirements of the assignment
//add games to the user list of games
const addGameToUserCollection = async (req, res) => {
  try {
    const { username, gameId } = req.body; //get the username and game id from the request body

    const user = await User.findOne({ username: username }); //find the user with the username
    // Check if the user exists
    if(!user) {
      return res.status(404).send('User not found'); //send error message and status if the user is not found
    }

    // Add game to user's collection if not already added
    if (!user.games.includes(gameId)) {
      user.games.push(gameId); // Ensure game ID is stored as ObjectId
      await user.save(); //save the user
      return res.status(200).send('Game added to user collection'); //send message and status of the game being added

    } else { //if the game is already in the user's collection
      return res.status(400).send('Game already in user collection');   //send error message and status
    }
  
  } catch (error) { //catch any errors
    return res.status(500).send('Error adding game to user collection'); //send error message and status
  }
};

// Reference: loginUser is a modified version from the COMP308 course examples --> 2025-02-02
//It has been modified to fit the requirements of the assignment
//check if the user is signed in
const isSignedIn = (req, res) => {
  //cookie token to check if the user is signed in
  const token = req.cookies.token;
  //check if the token exists
  if(!token) {
    return res.status(401).send({ screen: 'auth' }); //send status and screen value
  }

  var payload;
  try {
    //verify the token
    payload = jwt.verify(token, jwtKey);
    req.id = payload.id; //store the id in the request id
  } catch (error) { //catch any errors
    if(error instanceof jwt.JsonWebTokenError) { //check if the error is a JsonWebTokenError
      return res.status(401).end() //if so, send status
    }
    return res.status(400).end() //send status if error 400 occurs
  }
  res.status(200).send({screen: payload.username}); //send status and screen value if all goes well
};

//remove a game from the database in the user's collection
const removeUserGame = async (req, res) => {
  try {
    const { username, gameId } = req.params; //get the username and game id from the request parameters

    const user = await User.findOne({ username: username }); //find the user with the username
    //check if the user exists
    if (!user) {
      return res.status(404).send('User not found'); //send error message
    }

    // Remove the game from the user's collection
    user.games.pull(gameId);

    await user.save(); //save the user

    res.send('Game removed!'); //send message
  } catch (error) { //catch any errors 
    res.status(400).send('Error removing game');  //send error message and status
  }
};

//export the functions
module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  isSignedIn,
  getUsersGames,
  addGameToUserCollection,
  removeUserGame,
};