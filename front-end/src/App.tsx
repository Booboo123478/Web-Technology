import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Profile from './Pages/Profile/Profile';

  function App() {
    return (
      <div style={{backgroundColor: '#00d0b129', minHeight: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </BrowserRouter>
      </div>
    );
  }

  export default App;