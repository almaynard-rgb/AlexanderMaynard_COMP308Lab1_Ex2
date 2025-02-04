//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

// server.js
const app = require('./app');
const port = process.env.PORT || 3000; // default port to listen

// start the Express server and listen on port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`); //send a message to the console
});
