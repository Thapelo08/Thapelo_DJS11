/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Previews from "./pages/podcasts/previews";
import Login from "./pages/Login"
import Favorites from "./pages/Favorites"
import Layout from "./components/Layout"
import Show from "./pages/podcasts/show"
import Episodes from "./pages/podcasts/Episodes"
import AudioPlayer from "./components/AudioPlayer";





function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="previews" element={<Previews />} />
          <Route path="login"
          element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="show/:id" element={<Show />} />
          <Route path="show/:id/season/:season" element={<Episodes/>} /> 
          
          


          
          </Route>
        </Routes>
     </BrowserRouter>
  )
}

export default App;


