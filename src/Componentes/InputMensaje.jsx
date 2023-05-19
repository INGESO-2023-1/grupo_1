import React, { useContext } from 'react'
import { ChatContext } from '../Contexto/ChatContext'
import { AuthContext } from '../Contexto/AuthContext'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuid } from "uuid"
import { useState } from 'react'

const InputMensaje = () => {

  const [text, setText] = useState("")

  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  console.log("Aqui")
  console.log(data.chatId)

  const handleSend = async ()=>{
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now()

      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

  }
  
  return (
    <div className='InputMensaje'>
      <input type="text" placeholder='Escribe Algo'/>
      <div className='Enviar'>
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  )
}

export default InputMensaje