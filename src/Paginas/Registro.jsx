import React from 'react'
import { auth,storage,db } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom"

const Registro = () => {

    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const nombre = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, nombre);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
            (snapshot) => {
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
            },
            (error) => {
                setErr(true)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    await updateProfile(res.user,{
                        displayName: nombre,
                        photoURL: downloadURL
                    });
                    await setDoc(doc(db,"users",res.user.uid),{
                        uid: res.user.uid,
                        nombre,
                        email,
                        photoURL: downloadURL
                    });
                    await setDoc(doc(db,"userChats", res.user.uid), {

                    });
                    navigate("/")

                });
            }
            );

            

        }catch(err){
            setErr(true)
        }


    }

    

    return (
        <div className = "contenedor">
            <div className = "wrapper">
                <span className="nombre-Proyecto">Mensajeria Sansana</span>
                <span className="titulo">Registrarse</span>
                <form onSubmit={handleSubmit}>
                    <input type = "text" placeholder='Nombre' />
                    <input type = "email" placeholder='Correo' />
                    <input type = "password" placeholder='Contraseña' />
                    <input style={{display:"none"}} type = 'file' id = "file"/>
                    <label htmlFor="file">
                        <img src="../Imagenes/avatar.png" alts=""/>
                        <span>Añadir Foto de Perfil</span>
                    </label>
                    <button>Registrarse</button>
                    <p>¿Ya tienes una cuenta? <Link to="/Login">Ingresa</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Registro