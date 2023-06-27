import React, { useContext } from 'react'
import { ChatContext } from '../Contexto/ChatContext'
import { AuthContext } from '../Contexto/AuthContext'
import { Timestamp, serverTimestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuid } from "uuid"
import { useState } from 'react'

const InputMensaje = () => {

  const [text, setText] = useState("")

  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async ()=>{
    await updateDoc(doc(db,"chats",data.chatId),{
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now()

      }),
    });

    setText("")

    // No realizado
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    

  }
  
  return (
    <div className='InputMensaje'>
      <input type="text" placeholder='Escribe Algo' onChange={(e) => setText(e.target.value)} onKeyPress={handleKeyPress} value={text}/>
      <div className='Enviar'>
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  )
}

export default InputMensaje