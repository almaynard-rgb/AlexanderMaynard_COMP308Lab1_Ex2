//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//App.jsx

//importing the necessary modules
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

//importing the necessary components
import Login from './components/login';
import Register from './components/Register';
import ListGames from './components/ListGames';
import UserGamesCollection from './components/UserGameCollection';


//App function that renders the Navbar and the Routes
function App() {

  //returning the Navbar and the Routes
  return (
    <Router>
      <Navbar className="navbar-custom" bg="secondary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/list_of_games">Game Collector</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/list_of_games">List of Games</Nav.Link>
              <Nav.Link as={Link} to="/user_games_collection">Your Collection</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<ListGames />} />
          <Route path="list_of_games" element={<ListGames />} />
          <Route path="user_games_collection" element={<UserGamesCollection />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; //exporting the App function
