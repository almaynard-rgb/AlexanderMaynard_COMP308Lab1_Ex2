//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//UserGamesCollection.jsx



//importing the necessary modules
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './general.css'


//This file is responsible for rendering the list of games that are available in users collection for users.game sub colection
//It also allows the user to review games in their personal collection and remove them if they want to
function UserGamesCollection(props) {

  // React Hooks
  const [loginStatus, setLoginStatus] = useState('auth'); // state for the login status
  const [games, setGames] = useState([]); // state for the games
  const [username, setUsername] = useState(null); // state for the username

  // Reference: this is a modified version from the example given by the COMP308 course examples
  // It has been modified to fit the requirements of the assignment
  // function to check if the user is logged in
  const isLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sign_in_cookie', { withCredentials: true });
            
      // if the user is logged in, set the login status to the username
      if (response.data.screen !== undefined) {
        setLoginStatus(response.data.screen); // set the login status to the username
        setUsername(response.data.screen); // set the username to so that it can be passed to the backend later if needed
        console.log(response.data.screen); // log the response
      }
      } catch (error) { // if there is an error, set the login status to auth for correct rendering the page
        setLoginStatus('auth'); // set the login status to auth to render the page correctly
        console.log(error); // log the error
        }
    };

      // useEffect to check if the user is logged in --> happens once when the page is loaded
      useEffect(() => {
        isLoggedIn();
      }, []);


  // useEffect to get the game data from the backend --> happens once when the page is loaded
  useEffect(() => {
    const getUserGameData = async () => {
      try {  
        const result = await axios.post('http://localhost:3000/api/get_user_games', { username });
        console.log(result.data);
        setGames(result.data);
      } catch (error) {
        console.log('error in fetchData', error); // log the error
      }
    };   
    // if the username is not null, get the user game data
    if (username) { 
      //then get the user game data
      getUserGameData();
    }
  }, [username]); //load this wehn the username changes

  
  //function to remove a game from the user's collection (from the user.games subcollection)
  const removeGame = async (gameId) => { //takes the gameId as a parameter
    try {
      //send a delete request to the backend to remove the game from the user's collection
      await axios.delete(`http://localhost:3000/api/remove_user_game/${username}/${gameId}`); //send the username and gameId to the backend as parameters
      setGames(games.filter(game => game._id !== gameId)); //set the games to the games that do not have the gameId
    } catch (error) { //if there is an error, log the error
      console.log('error in removeGame', error); //log the error
    }
  };

  // return the JSX for the ListGames component
  return (
    <div className="bg-dark bg-gradient vh-100 text-white pt-4 ">
      {/* If the user is not logged in... then just show a message to loggin before viewing games */}
      {loginStatus === 'auth' ? (
        <div className="d-flex text-center justify-content-center pt-4">
          <ListGroup className="w-50">
            <div>
              <div className="text-left mr-3">
                <h2>Login to view your games</h2>
              </div>
            </div>
          </ListGroup>
        </div>
      ) : (
        <div className='d-flex justify-content-center'>
          {/* If the user is logged in display the list of games the user has in their collecting */}
          <Table className="table-dark table-striped table-hover table-bordered w-75">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Platform</th>
                <th>Release Year</th>
                <th>Developer</th>
                <th>Rating</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index}>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.title}</td>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.genre}</td>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.platform}</td>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.releaseYear}</td>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.developer}</td>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.rating}</td>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.description}</td>
                  <td className='justify-content-center align-middle'>
                    <Button size="md" className='btn-danger' onClick={() => removeGame(game._id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default UserGamesCollection;
