import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage';


function App() {

  return (
    <div>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    
    </Routes>

  </div>
  )
}

export default App
