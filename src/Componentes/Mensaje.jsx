import React, { useContext } from 'react'
import { AuthContext } from '../Contexto/AuthContext'
import { ChatContext } from '../Contexto/ChatContext'

const Mensaje = () => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  return (
    <div className='Mensaje Mio'>
      <div className='Info'>
        <img 
          src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
          alts=""
        />
        <span>Ahora</span>
      </div>
      <div className='Contenido'>
        <p>Que pez</p>
      </div>
    </div>
  )
}

export default Mensaje