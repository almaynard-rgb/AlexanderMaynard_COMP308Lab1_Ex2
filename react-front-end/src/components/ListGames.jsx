//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//ListGames.jsx

//importing the necessary modules
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; //importing axios for the API calls to different routes
import './general.css' //importing the general css file for the styling
import { ListGroupItem } from 'react-bootstrap';
import MyDisc from './MyDisc'; //importing the MyDisc component for the list items Three.js component when the user can add games to their collection
import MyX from './MyX'; //importing the MyX component for the list items Three.js component when the user cant add games to their collection


//This file is responsible for rendering the list of games that are available in the colection
//It also allows the user to add games to their collection if they are logged in
//ListGames function
function ListGames() {
    // React Hooks
    const [games, setGames] = useState([]); // state for the games
    const [loginStatus, setLoginStatus] = useState('auth'); // state for the login status
    const [username, setUsername] = useState(null); // state for the username
    const [gameSearch, setGameSearch] = useState(''); // state for the game search

    // Reference: this is a modified version from the example given by the COMP308 course examples
    // It has been modified to fit the requirements of the assignment
    // function to check if the user is logged in
    const isLoggedIn = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/sign_in_cookie', { withCredentials: true }); // get the cookie from the server to see if user is logged in already
            // if the user is logged in, set the login status to the username
            if (response.data.screen !== undefined) {
                setLoginStatus(response.data.screen); // set the login status to the username
                setUsername(response.data.screen); // set the username to so that it can be passed to the backend later if needed
                console.log(response.data.screen); // log the response
            }
        } catch (error) { // catch the error
            setLoginStatus('auth'); // set the login status to auth to render the page correctly
            console.log(error); // log the error
        }
    };

    // useEffect to check if the user is logged in --> happens once when the page is loaded
    useEffect(() => {
        isLoggedIn();
    }, []);

    // this function is responsible for adding the game to the user's game collection
    const handleAddingGameToCollection = async (gameId) => { // takes the gameId as a parameter
        try {
            // send a post request to the backend to add the game to the user's collection, 
            const request = await axios.post('http://localhost:3000/api/add_games', { username, gameId }); // send the username and gameId to the backend
            console.log(request.data); // log the data
        } catch (error) { // if there is an error, log the error and alert the user that the game is already in their collection
            window.alert('You already added this one!'); // alert the user that the game is already in their collection
            console.log(error); // log the error
        }
    };

    // useEffect to get the game data from the backend --> happens once when the page is loaded
    useEffect(() => {
        const getGameData = async () => {
            try {
                const result = await axios.get('http://localhost:3000/api/get_games/'); // get the games from the backend
                console.log(result.data); // log the data
                setGames(result.data); // set the games to the data
            } catch (error) {
                console.log('error in fetchData', error); // log the error if there is one
            }
        };
        getGameData(); // call the function to get the game data
    }, []);

    // return the JSX for the ListGames component
    return (
        <div className='bg-dark bg-gradient vh-100'>
            <h2 className='text-light justify-content-center text-center pt-4'>Game Library</h2>
            {/* If the user is not logged in... then just show the list with no option to add games */}
            {loginStatus === 'auth' ? (
                <div className="d-flex justify-content-center pt-4">
                    <ListGroup className="w-75">
                        <ListGroupItem className="bg-dark text-light justify-content-center d-flex">
                            <input className='w-75'
                                type="text"
                                placeholder="Search by title or platform"
                                value={gameSearch}
                                onChange={(e) => setGameSearch(e.target.value)}
                            />
                        </ListGroupItem>
                        {games.filter(game => game.title.toLowerCase().includes(gameSearch.toLowerCase()) || 
                        game.platform.toLowerCase().includes(gameSearch.toLowerCase())).map((game, index) => (
                            <ListGroup.Item className="bg-dark text-light" key={index}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="text-left mr-3 ml-0">
                                        <b>Title:</b> {game.title} | <b>Platform:</b> {game.platform}
                                    </div>
                                    <MyX />
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            ) : (
                <div className="d-flex justify-content-center pt-4">
                    {/* If the user is logged in display the list of games available to choose from with a button */}
                    <ListGroup className="w-50">
                        <ListGroupItem className="bg-dark text-light justify-content-center d-flex">
                            <input className='w-75'
                                type="text"
                                placeholder="Search by title or platform"
                                value={gameSearch}
                                onChange={(e) => setGameSearch(e.target.value)}
                            />
                        </ListGroupItem>
                        {games.filter(game => game.title.toLowerCase().includes(gameSearch.toLowerCase()) || 
                        game.platform.toLowerCase().includes(gameSearch.toLowerCase())).map((game, index) => (
                            <ListGroup.Item className="bg-dark text-light" key={index}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <MyDisc />
                                    <div className="text-left mr-3">
                                        <b>Title:</b> {game.title} | <b>Platform:</b> {game.platform}
                                    </div>
                                    <Button size="md" className="align-items-right" onClick={() => handleAddingGameToCollection(game._id)}>Add</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}
        </div>
    );
}
export default ListGames; //export the ListGames function