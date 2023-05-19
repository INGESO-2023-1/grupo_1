import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase"
import { useState } from 'react'

const Login = () => {

    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            await signInWithEmailAndPassword(auth,email,password)
            navigate("/")
        }catch(err){
            setErr(true)
        }
    }

    return (
        <div className = "contenedor">
            <div className = "wrapper">
                <span className="nombre-Proyecto">Mensajeria Sansana</span>
                <span className="titulo">Ingresar</span>
                <form onSubmit={handleSubmit}>
                    <input type = "email" placeholder='Correo' />
                    <input type = "password" placeholder='Contraseña' />
                    <button>Ingresar</button>
                    <p>¿No tienes una cuenta? <Link to="/Registro">Registrate</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login