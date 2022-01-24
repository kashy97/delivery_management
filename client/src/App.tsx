import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  Home, 
  Login,
  Admin,
  Registration,
} from './components';
import history from './history';

function App() {
  return (
    <div className="App">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
