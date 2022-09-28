import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Geometry from './components/Geometry'
import Material from './components/Material'
import Model3D from './components/Model3D'
import Texture from './components/Texture'
import ModeloGTLF from './components/ModelosGTLF'
import Ring from './components/Ring'
import ModelCustom from './components/ModelCustom'

function Main() {
  return (
    <Routes> 
      <Route path="/model" element={<Model3D/>} />
      <Route path="/geometry" element={<Geometry/>} />
      <Route path="/material" element={<Material/>} />
      <Route path="/texture" element={<Texture/>} />
      <Route path="/modelogtlf" element={<ModeloGTLF/>} />
      <Route path="/ring" element={<Ring/>} />
      <Route path="/modelcustom" element={<ModelCustom/>} />

    </Routes>
  )
}

export default Main