import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';

export default function App() {
  return <BrowserRouter>
  <Routes>
    
    <Route path='/signup' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<Chat />} />
    <Route path='/setAvatar' element={<SetAvatar />} />

  </Routes>
  </BrowserRouter>
}
