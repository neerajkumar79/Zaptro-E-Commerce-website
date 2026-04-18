import React from 'react'
// import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

// Temporarily disabled Clerk auth - always allow access
// TODO: Re-enable when Clerk key added

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  return isLoggedIn ? children : <Navigate to='/login' />
}

export default ProtectedRoute

