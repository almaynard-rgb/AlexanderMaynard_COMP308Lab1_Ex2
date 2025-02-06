//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//Login.jsx

//importing the necessary modules
import React, { useState, useEffect } from 'react'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './general.css'
import axios from 'axios'; //importing axios for the API calls to different routes
import { useNavigate } from 'react-router-dom'; //importing the useNavigate hook from react-router-dom
import MyDiscBackground from './MyDiscBackground'; //importing the MyDiscBackground component for the background Three.js component


//this function is responsible for rendering the login page. It allows a user to login to the application or log out if they are already logged in
function Login() {
    const [username, setUsername] = useState(''); // state for the username
    const [password, setPassword] = useState(''); // state for the password
    const [loginStatus, setLoginStatus] = useState('auth'); // state for the login status
    const navigate = useNavigate(); //used to navigate to different pages

    // Reference: this was contructed by referencing the examples given by the COMP308 course examples
    // It has been modified to fit the requirements of the assignment
    // function to log in the user
    const authenticateUser = async () => {
        try {
            const loginInfo = { username, password }; // create loginIfno with the username and password states
            const response = await axios.post('http://localhost:3000/api/login', loginInfo , { withCredentials: true }); //post the loginInfo to the backend while passing the loginInfo
            
            //check if the user is logged in
            if (response.data.screen !== undefined) {
                setLoginStatus(response.data.screen); // set the login status to the username
                window.alert('You logged in sucessfully!'); // alert the user that they logged in successfully
                console.log('user logged in successfully'); // log that the user logged in successfully
                navigate('/user_games_collection'); // navigate to the user_games_collection page after login
            }
        } catch (error) { // if there is an error, alert the user that the username or password is wrong
            console.log('error in logging in the user'); // log the error
            window.alert('Wrong username or password!'); // alert the user that the username or password is wrong
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
            console.log('user logged out successfully'); // log that the user logged out successfully
            setLoginStatus('auth'); // set the login status to auth so that the proper page is rendered
        } catch (error) { // if there is an error, log the error
          console.log('error in registering the user'); // log the error
        }
      };

    // Reference: this was contructed by referencing the examples given by the COMP308 course examples
    // It has been modified to fit the requirements of the assignment
    // function to check if the user is logged in
    const isLoggedIn = async () => {
        try {
            // get the cookie from the server to see if user is logged in already with post request
            const response = await axios.get('http://localhost:3000/api/sign_in_cookie', { withCredentials: true });
            //check if the user is logged in
            if (response.data.screen !== undefined) {
                setLoginStatus(response.data.screen); // set the login status to the username
                console.log(response.data.screen);  // log the response
            }
        } catch (error) {  // catch the error
            setLoginStatus('auth'); // if there is an error, set the login status to auth for correct rendering the page
            console.log(error); // log the error
        }
    };
    // useEffect to check if the user is logged in --> happens once when the page is loaded
    useEffect(() => {
        isLoggedIn(); // call the isLoggedIn function
    }, []);

    //return the JSX for the Login component
    return (
        <div className='bg-dark bg-gradient vh-100 text-center' style={{position: "relative", zIndex: 0}}>
            <MyDiscBackground />
            <h2 className='text-light justify-content-center text-center pt-4'>Login</h2>
            {/* If the user is not logged in, then let them log in */}
            {loginStatus === 'auth' ? (
                <div>
                    <Form className='bg-secondary bg-gradient text-light pt-4 mt-2 mb-2 mr-2 ml-2 rounded d-flex flex-column align-items-center' style={{zIndex: 1 }}>
                        <Form.Group size="lg">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                className='w-100'
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter user name"
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
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="login-button mt-4 mb-4" size="lg" variant="primary" type="Button" onClick={authenticateUser}>
                            Login
                        </Button>
                    </Form>
                </div>
            ) : (
                <Form className='bg-secondary bg-gradient text-light pt-4 mt-2 mb-2 mr-2 ml-2 rounded d-flex flex-column align-items-center' onSubmit={handleLogout}>
                  {/* If the user is logged in. then let them logout */}
                  <Form.Label>User already logged in</Form.Label>
                  <Button className="logout-button mt-4 mb-4" size="lg" variant="primary" type="submit">
                    Log out
                  </Button>
                </Form>
            )}
        </div>
    );
}
//
export default Login; //export the Login component