import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../Contexto/AuthContext'
import { ChatContext } from '../Contexto/ChatContext'

const Mensaje = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>      
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