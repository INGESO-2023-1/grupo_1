import React from 'react'
import BarraDeNavegacion from './BarraDeNavegacion'
import Busqueda from './Busqueda'
import Chats from "./Chats"

const BarraLateral = () => {
  return (
    <div className="BarraLateral">
      <BarraDeNavegacion/>
      <Busqueda/>
      <Chats/>
    </div>
  )
}

export default BarraLateral