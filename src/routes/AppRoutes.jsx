import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Login from '../Pages/auth/Login'
import Register from '../Pages/auth/Register'

const AppRoutes = () => {

  return (
    
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
     </Routes>
    
  )
}

export default AppRoutes
