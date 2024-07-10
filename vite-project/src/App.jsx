import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Favorites from "./pages/Favorites"





function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="login"
          element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="favorites" element={<Favorites />} />


          
          </Route>
        </Routes>
     </BrowserRouter>
  )
}

export default App;