//Alexander Maynard 301170707
//February 3rd, 2025
//Comp308, Lab Assignment 1

//main.jsx

//importing the necessary modules
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';

//rendering the App component
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
