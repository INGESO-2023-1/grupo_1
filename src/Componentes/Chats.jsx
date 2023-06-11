import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../Contexto/AuthContext';
import { useState } from 'react';
import { ChatContext } from '../Contexto/ChatContext';

const Chats = () => {

  const [chats, setChats] = useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(()=>{
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
  
      return ()=>{
        unsub();
      };
    };

    currentUser.uid && getChats()

  }, [currentUser.uid]);
  console.log(Object.entries(chats))
  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }

  return (
    <div className='Chats'>
      {Object.entries(chats)?.map((chat)=>(
        <div className='Usuario' key = {chat[0]}>
          <img src={chat[1].userInfo.photoURL}/>
          <span>{chat[1].userInfo.displayName}</span>
          <button onClick={()=>handleSelect(chat[1])}>Abrir</button>

        </div>
      ))}
    </div>
  )
}

export default Chats