import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Contexto/ChatContext";
import { db } from "../firebase";
import Mensaje from "./Mensaje";

const Mensajes = () => {

  const {data} = useContext(ChatContext)

  const [messages, setMessages] = useState([])

  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return()=>{
      unsub()
    }

  }, [data.chatId])

  return (
    <div className='Mensajes'>
      {messages?.map(m=>(
        <Mensaje message={m} key={m.id}/>
      ))}
    </div>
  )
}

export default Mensajes