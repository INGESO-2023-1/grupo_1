import {React,useContext,useState} from 'react'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore";
import { db } from "../firebase"
import { AuthContext } from '../Contexto/AuthContext'

const Busqueda = () => {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async ()=>{
    const q = query(
      collection(db,"users"),
      where("nombre","==",username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }catch(err){
      setErr(true)
    }
  };

  const handleKey = (e)=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    console.log("1")
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("2")
    try {
      console.log("3")
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("4")
      if (!res.exists()) {
        console.log("5")
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("6")
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (
    <div className='Busqueda'>
      <div className='Formato'>
        <input type="text" placeholder='Buscar Usuario' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
      </div>
      {err && <span>No encontrado</span>}
      {user && (<div className='ChatDeUsuario' onClick={handleSelect}>
        <img src={user.photoURL} alts=""/>
        <div className="UserChatInfo">
          <span>{user.nombre}</span>
        </div>
      </div>)}
    </div>
  )
}

export default Busqueda