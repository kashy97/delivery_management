import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {
  Home, 
  ULogin,
  ALogin,
  Admin,
  Registration,
} from './components';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ULogin/>} />
            <Route path="/admin" element={<ALogin/>} />
            <Route 
              path="/admin/home" 
              element={<Admin />}
            />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
