//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//Register.jsx

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './general.css'
import axios from 'axios'; //importing axios for the API calls to different routes
import { useNavigate } from 'react-router-dom';
import MyDiscBackground from './MyDiscBackground'; //importing the MyDiscBackground component for the background Three.js component



//this function is responsible for rendering the register page. It allows a user to register to the application or log out if they are already logged in
function Register() {
  const [username, setUsername] = useState(''); // state for the username
  const [password, setPassword] = useState(''); // state for the password
  const [loginStatus, setLoginStatus] = useState('auth');   
  const navigate = useNavigate(); //used to navigate to different pages


  // Reference: this was contructed by referencing the examples given by the COMP308 course
  // It has been modified to fit the requirements of the assignment
  // function to register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //send a post request to the backend to register the user, pass the username and password to the backend in req.body
      await axios.post('http://localhost:3000/api/register', { username, password }); 
      window.alert('You registered sucessfully!'); // alert the user that they registered successfully
      navigate('/login'); // navigate to the login page after registering
      console.log('user registered successfully'); // log that the user registered successfully
    } catch (error) { //catch the error
      if(error.response.status === 400) { //check if error 400
        window.alert('User already exists or text format was wrong!'); // alert the user that the user already exists or the text format was wrong
      }
      console.log('error in registering the user'); // log the error
    }
  };
  

  //this function is responsible for logging out the user
  const handleLogout = async (e) => {
    //prevent the default action from happening
    e.preventDefault(); 
    try {
      //send a get request to the backend to log out the user
      await axios.get('http://localhost:3000/api/logout', { withCredentials: true });
      window.alert('You logged out sucessfully!'); // alert the user that they logged out successfully
      console.log('user logged out successfully');  // log that the user logged out successfully
      setLoginStatus('auth'); // set the login status to auth so that the proper page is rendered
    } catch (error) {
      console.log('error in registering the user'); // log the error
    }
  };


  // Reference: this was contructed by referencing the examples given by the COMP308 course
  // It has been modified to fit the requirements of the assignment
  // function to check if the user is logged in already
  const isLoggedIn = async () => {
    try {
        //get the cookie from the backend to check if the user is logged in with post request
        const response = await axios.get('http://localhost:3000/api/sign_in_cookie', { withCredentials: true });
        //check if the user is logged in
        if (response.data.screen !== undefined) {
            setLoginStatus(response.data.screen); // set the login status to the username
            console.log(response.data.screen); // log the response
        }
    } catch (error) { // catch the error
        setLoginStatus('auth'); // if there is an error, set the login status to auth for correct rendering of the page
        console.log(error); // log the error
    }
  };

  //useEffect hook to check if the user is logged in --> happens once when the page is loaded
  useEffect(() => {
    isLoggedIn(); // call the isLoggedIn function
  }, []);


  return (
    <div className='bg-dark bg-gradient vh-100 text-center' style={{position: "relative", zIndex: 0}}>
    <MyDiscBackground />
      <h2 className='text-light justify-content-center text-center pt-4'>Register</h2>
      {/* If the user is not logged in, then let them register */}
      {loginStatus === 'auth' ? (
        <div>
          <Form className='bg-secondary bg-gradient text-light pt-4 mt-2 mb-2 mr-2 ml-2 rounded d-flex flex-column align-items-center' onSubmit={handleSubmit}>
            <Form.Group size="lg">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                className='w-100'
                type="text"
                name="username"
                id="username"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className='w-100'
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="login-button mt-4 mb-4" size="lg" variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </div>
      ) : (
        <Form className='bg-secondary bg-gradient text-light pt-4 mt-2 mb-2 mr-2 ml-2 rounded d-flex flex-column align-items-center' onSubmit={handleLogout}>
          {/* If the user is logged in, then let them log out */}
          <Button className="logout-button mt-4 mb-4" size="lg" variant="primary" type="submit">
            Log out
            </Button>
        </Form>
      )}
    </div>
  );
};

export default Register; //export the Register component