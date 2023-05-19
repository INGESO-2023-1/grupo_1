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

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }

  console.log(Object.entries(chats))
  return (
    <div className='Chats'>
      {Object.entries(chats)?.map(chat=>{
        <div className='ChatDeUsuario' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].photoURL} alt=""/>
          <div className="UserChatInfo">
            <span>{chat[1].displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      })}
      
    </div>
  )
}

export default Chats