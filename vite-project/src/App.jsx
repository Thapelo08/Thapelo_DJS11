import React from "rect";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import About from "./pages/About"



function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />

          
          </Route>
        </Routes>
     </BrowserRouter>
  )
}