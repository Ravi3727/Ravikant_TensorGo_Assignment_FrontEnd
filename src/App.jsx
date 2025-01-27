import './App.css'
import { useState } from 'react'
import { AppContext } from './context/AppContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllPlans from './components/AllPlans';
import CreatePlans from './components/CreatePlans';
import UserDashboard from './components/Dashboards/UserDashboard';
import DisplayCart from './components/displayCart';
import History from './components/Dashboards/History';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  const [user, setUser] = useState();
  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={< AllPlans />} />
            <Route path="/create-plan" element={< CreatePlans />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <DisplayCart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  )
}

export default App