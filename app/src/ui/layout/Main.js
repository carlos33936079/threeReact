import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Geometry from './components/Geometry'
import Model3D from './components/Model3D'


function Main() {
  return (
    <Routes> 
      <Route path="/model" element={<Model3D/>} />
      <Route path="/geometry" element={<Geometry/>} />
    </Routes>
  )
}

export default Main