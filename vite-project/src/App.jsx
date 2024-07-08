import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import About from "./pages/About"
import Login from "./pages/Login"



function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="login"
          element={<Login />} />


          
          </Route>
        </Routes>
     </BrowserRouter>
  )
}

export default App;