import React, { useContext } from 'react'
import Mensajes from "./Mensajes"
import InputMensaje from "./InputMensaje"
import { ChatContext } from '../Contexto/ChatContext'

const ChatSolo = () => {

  const {data} = useContext(ChatContext)
  console.log("Data:")
  console.log(data)

  return (
    <div className="ChatSolo">
      <div className='ChatInfo'>
        <span>{data.user.userInfo?.displayName}</span>
      </div>
      <Mensajes/>
      <InputMensaje/>
    </div>
  )
}

export default ChatSolo