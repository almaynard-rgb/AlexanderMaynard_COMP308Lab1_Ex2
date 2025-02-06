//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//app.js

//improting the necessary moduless
const express = require('express');
const bodyParser = require('body-parser'); //body parser is used to parse the incoming request bodies in a middleware before you handle itq
const mongoose = require('mongoose') //to help with MongoDB modeling
const cors = require('cors'); //to help with bypassiumg the same-origin policy
const userRoutes = require('./routes/usersRoutes') //importing the user routes
const gameRoutes = require('./routes/gamesRoutes') //importing the game routes
const Game = require('./models/game'); //importing the game model
const cookieParser = require('cookie-parser'); //to help with parsing cookies
const app = express(); 


//Reference: this was suggested by Copilot after many issues with accessing ''http://localhost:5173''-->  2025-02-02
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware for parsing request bodies and cookies
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/game_collector_db', { //name of the database is game_collector_db
}).then(() => {
  console.log('Connected to MongoDB'); //send message that we are connected to MongoDB
  initializeGameData(); //initialize the game data
}).catch((error) => { //catch any errors
  console.error('Error connecting to MongoDB:', error.message); //send error message and status
});

// Routes to be added here
app.use(userRoutes);
app.use(gameRoutes);


// Reference: this is a modified version from the example/suggestion given by Github copilot on 2025-02-02 at 2:27pm 20/02/2025,
// The data inserted and location to be inserted has been modified to fit the requirements of the assignment
// Function to initialize game data 
const initializeGameData = async () => {
  //NOTE: The descriptions are taken from Wikipedia for the associated games
  const games = [
    { title: 'The Legend of Zelda: Breath of the Wild', genre: 'Open world', platform: "Nintendo Switch", releaseYear: 2017, developer: 'Nintendo', rating: 4.8, description: 'The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U. Set at the end of the Zelda timeline, the player controls an amnesiac Link as he sets out to save Princess Zelda and prevent Calamity Ganon from destroying the world.' },
    { title: 'Super Mario Odyssey', genre: '3D-Platformer', platform: "Nintendo Switch", releaseYear: 2017, developer: 'Nintendo', rating: 4.5, description: 'Super Mario Odyssey is a 2017 platform game developed and published by Nintendo for the Nintendo Switch.' },
    { title: 'Pokemon Scarlet', genre: 'RPG', platform: "Nintendo Switch", releaseYear: 2022, developer: 'Game Freak', rating: 3.4, description: 'Pokémon Scarlet and Pokémon Violet are 2022 role-playing video games developed by Game Freak and published by Nintendo and The Pokémon Company for the Nintendo Switch. They are the first installments in the ninth generation of the Pokémon video game series.' },
    { title: 'The Legend of Zelda: Ocarina of Time', genre: 'Action-adventure', platform: "Nintendo 64", releaseYear: 1998, developer: 'Nintendo', rating: 4.9, description: 'The Legend of Zelda: Ocarina of Time[a] is a 1998 action-adventure game by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998 and in PAL regions the following month. The game is the first in the Legend of Zelda series with 3D graphics.' },
    { title: 'Super Mario 64', genre: '3D-Platformer', platform: "Nintendo 64", releaseYear: 1996, developer: 'Nintendo', rating: 4.7, description: "Super Mario 64 is a 1996 platform game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in 1996 and PAL regions in 1997. It is the first Super Mario game to feature 3D gameplay, combining traditional Super Mario gameplay, visual style, and characters in a large open world. In the game, Bowser, the primary antagonist of the Super Mario franchise, invades Princess Peach's castle and hides the castle's sources of protection, the Power Stars, in many different worlds inside magical paintings. As Mario, the player collects Power Stars to unlock enough of Princess Peach's castle to get to Bowser and rescue Princess Peach."},
    { title: 'Pokemon Red', genre: 'RPG', platform: 'Gameboy', releaseYear: 1996, developer: 'Game Freak', rating: 4.2, description: 'Pokémon Red Version and Pokémon Blue Version are 1996 role-playing video games (RPGs) developed by Game Freak and published by Nintendo for the Game Boy. They are the first installments of the Pokémon video game series, and were first released in Japan as Pocket Monsters Red[a] and Pocket Monsters Green,[b] followed by the special edition Pocket Monsters Blue[c] later that year. The games were released internationally in 1998 and 1999 as Pokémon Red and Pokémon Blue, while an enhanced version named Pokémon Yellow Version: Special Pikachu Edition,[d][e] was released in Japan in 1998 and in other regions in 1999 and 2000.'}
  ];
  
  //try to insert the new values into the database
  try {
    await Game.deleteMany(); // Clear existing data
    await Game.insertMany(games); // Insert new data into the database from the games array
    console.log('Initial game data inserted');
  } catch (error) { //catch any errors
    console.error('Error inserting game data:', error.message); //send error message and status
  }
};

module.exports = app; //export the app