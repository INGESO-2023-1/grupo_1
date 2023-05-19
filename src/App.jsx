import Registro from "./Paginas/Registro"
import Login from "./Paginas/Login"
import Inicio from "./Paginas/Inicio"
import "./style.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./Contexto/AuthContext"

function App() {

  const {currentUser} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/">
          <Route index element = {currentUser ? <Inicio/>:<Login/>}/>
          <Route path="login" element = {<Login/>}/>
          <Route path="registro" element = {<Registro/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
