import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {
  Home, 
  ULogin,
  ALogin,
  Admin,
  Dashboard,
} from './components';
import {
  Assigned,
  Progress,
  Completed,
} from './pages';

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
            <Route path="/home" element={<Dashboard />} />
            <Route path="/home/assigned" element={<Assigned />} />
            <Route path="/home/progress" element={<Progress />} />
            <Route path="/home/completed" element={<Completed />} />

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
