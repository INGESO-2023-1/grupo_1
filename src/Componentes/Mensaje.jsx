import React, { useContext } from 'react'
import { AuthContext } from '../Contexto/AuthContext'
import { ChatContext } from '../Contexto/ChatContext'

const Mensaje = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>      
      <div className='Info'>
        <img 
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.userInfo.photoURL}
          alts=""
        />
      </div>
      <div className='Contenido'>
        <p>{message.text}</p>
      </div>
    </div>
  )
}

export default Mensaje