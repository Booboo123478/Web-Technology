  import React from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import HomePage from './Pages/HomePage/HomePage';
  import Login from './Pages/Auth/Login';
  import Register from './Pages/Auth/Register';

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;