import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/Login' element={<Login />} />
    </Routes>
  )
}
export default App
