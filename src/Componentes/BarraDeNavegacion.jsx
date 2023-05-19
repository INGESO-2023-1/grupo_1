import React, { useContext } from 'react'
import { auth } from '../firebase'
import { signOut } from "firebase/auth"
import { AuthContext } from '../Contexto/AuthContext'

const BarraDeNavegacion = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='BarraDeNavegacion'>
      <span className='Logo'>Mensajeria Sansana</span>
      <div className='Usuario'>
        <img src={currentUser.photoURL}/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Salir</button>
      </div>
    </div>
  )
}

export default BarraDeNavegacion