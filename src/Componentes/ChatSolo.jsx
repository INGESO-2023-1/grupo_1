import React, { useContext } from 'react'
import Mensajes from "./Mensajes"
import InputMensaje from "./InputMensaje"
import { ChatContext } from '../Contexto/ChatContext'

const ChatSolo = () => {

  const {data} = useContext(ChatContext)

  return (
    <div className="ChatSolo">
      <div className='Info'>
        <span>{data.user?.nombre}</span>
      </div>
      <Mensajes/>
      <InputMensaje/>
    </div>
  )
}

export default ChatSolo