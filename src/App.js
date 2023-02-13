import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import TodoList from './pages/TodoList'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/todo' element={<TodoList/>} />
      </Routes>
    </div>
  );
}