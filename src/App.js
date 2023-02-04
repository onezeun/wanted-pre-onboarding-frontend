import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import TodoList from './pages/TodoList'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/todolist' element={<TodoList/>} />
      </Routes>
    </div>
  );
}