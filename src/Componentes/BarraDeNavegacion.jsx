import React, { useContext,useRef } from 'react'
import { auth } from '../firebase'
import { signOut } from "firebase/auth"
import { AuthContext } from '../Contexto/AuthContext'
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db,storage } from '../firebase'
import { Timestamp, serverTimestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const BarraDeNavegacion = () => {

  const {currentUser} = useContext(AuthContext)
  const fileInputRef = useRef(null);

  const handleFileInputChange = async () =>{
    const file = fileInputRef.current.files[0];

    // Upload "file" to firebase storage
    const storageRef = ref(storage, currentUser.displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',

      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }

      }, (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error)
      }, () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await updateDoc(doc(db, "users", currentUser.uid), {
            photoURL: downloadURL
          });
        });
      }
    );
  }

  return (
    <div className='BarraDeNavegacion'>
      <span className='Logo'>Mensajeria Sansana</span>
      <div className='Usuario'>
        <label htmlFor="fileInput">
          <img src={currentUser.photoURL} onClick={(e) => e.stopPropagation() && fileInputRef.current.click()} />
        </label>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Salir</button>
        <input
          id="fileInput"
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </div>
    </div>
  )
}

export default BarraDeNavegacion